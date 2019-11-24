import { gameReducer, initialState } from './game.reducer';
import {
  SET_NUMBERS_OF_PLAYERS,
  FETCH_CARDS_START,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_ERROR,
  THROW_CARD_COMPUTER,
  THROW_CARD_PLAYER,
  FIND_ROUND_WINNER,
  CALCULATE_SCORE,
  CLEANUP_BOARD,
} from '../actions/game.actions';

const stateExample = {
  numberOfPlayers: 0,
  deck: null,
  loading: false,
  error: false,
  players: {},
  cardsOnTable: [],
  moveInProgress: false,
  roundWinnerCard: null,
  gameWinner: null,
};

jest.mock('../../config', () => {
  return {
    NUMBER_OF_CARDS_PER_PLAYER: 2,
    CARD_VALUES: { 8: 8 },
  };
});

describe('game reducer test', () => {
  it('should return updated state after setNumberOfPlayers', () => {
    expect(
      gameReducer(initialState, { type: SET_NUMBERS_OF_PLAYERS, payload: 2 }),
    ).toEqual({ ...stateExample, numberOfPlayers: 2 });
  });

  it('should return updated state after fetchCardsStart', () => {
    expect(gameReducer(initialState, { type: FETCH_CARDS_START })).toEqual({
      ...stateExample,
      loading: true,
    });
  });

  it('should return updated state after fetchCardsSuccess', () => {
    expect(
      gameReducer(initialState, {
        type: FETCH_CARDS_SUCCESS,
        payload: {
          data: {
            cards: [
              { code: '8h', image: 'lala', value: 8 },
              { code: 'ACE', image: 'lala', value: 'ACE' },
              { code: '10', image: 'lala', value: 10 },
              { code: 'JAck', image: 'lala', value: 'JACK' },
            ],
          },
        },
      }),
    ).toEqual({
      ...stateExample,
      loading: false,
      players: {
        player1: {
          cards: [
            { code: '8h', image: 'lala', value: 8 },
            { code: 'ACE', image: 'lala', value: 'ACE' },
          ],
          score: 0,
        },
        player2: {
          cards: [
            { code: '10', image: 'lala', value: 10 },
            { code: 'JAck', image: 'lala', value: 'JACK' },
          ],
          score: 0,
        },
      },
    });
  });

  it('should return updated state after fetchCardsError', () => {
    expect(gameReducer(initialState, { type: FETCH_CARDS_ERROR })).toEqual({
      ...stateExample,
      loading: false,
      error: true,
    });
  });

  it('should return updated state after throwCArdComputer', () => {
    const currentState = {
      ...stateExample,
      players: {
        player1: {
          cards: [{ code: '8h', image: 'sth', value: 8 }],
          score: 0,
        },
        player2: {
          cards: [{ code: '10', image: 'sth', value: '10' }],
          score: 0,
        },
      },
      cardsOnTable: [
        { user: 'player1', card: { value: '8', image: 'sth', code: '8' } },
      ],
    };

    expect(
      gameReducer(currentState, {
        type: THROW_CARD_COMPUTER,
        payload: 'player2',
      }),
    ).toEqual({
      ...currentState,
      cardsOnTable: [
        { user: 'player1', card: { value: '8', image: 'sth', code: '8' } },
        { user: 'player2', card: { value: '10', image: 'sth', code: '10' } },
      ],
      players: {
        ...currentState.players,
        player2: { cards: [], score: 0 },
      },
      moveInProgress: true,
    });
  });

  it('should return updated state after throwCArdPlayer', () => {
    const currentState = {
      ...stateExample,
      players: {
        player1: {
          cards: [{ code: '8', image: 'sth', value: '8' }],
          score: 0,
        },
        player2: {
          cards: [{ code: '10', image: 'sth', value: '10' }],
          score: 0,
        },
      },
    };

    expect(
      gameReducer(currentState, {
        type: THROW_CARD_PLAYER,
        payload: {
          user: 'player1',
          card: { code: '8', image: 'sth', value: '8' },
        },
      }),
    ).toEqual({
      ...currentState,
      cardsOnTable: [
        { user: 'player1', card: { code: '8', image: 'sth', value: '8' } },
      ],
      players: {
        ...currentState.players,
        player1: { cards: [], score: 0 },
      },
      moveInProgress: true,
    });
  });

  it('should return updated state after findRoundWinner', () => {
    const currentState = {
      ...stateExample,
      cardsOnTable: [
        { user: 'player1', card: { code: '8', image: 'sth', value: '8' } },
        { user: 'player2', card: { code: '8', image: 'sth', value: '8' } },
      ],
    };

    jest.mock('../../util/util', () => {
      return {
        findGreatestCard: () => ({
          user: 'player2',
          card: { code: '8', image: 'sth', value: '8' },
        }),
      };
    });

    expect(
      gameReducer(currentState, {
        type: FIND_ROUND_WINNER,
      }),
    ).toEqual({
      ...currentState,
      roundWinnerCard: {
        user: 'player2',
        card: { code: '8', image: 'sth', value: '8' },
      },
    });
  });

  it('should return updated state after calculateScore', () => {
    const currentState = {
      ...stateExample,
      cardsOnTable: [
        { user: 'player1', card: { code: '8', image: 'sth', value: '8' } },
        { user: 'player2', card: { code: '8', image: 'sth', value: '8' } },
      ],
      players: {
        player1: {
          cards: [],
          score: 0,
        },
        player2: {
          cards: [],
          score: 10,
        },
      },
      roundWinnerCard: {
        user: 'player2',
        card: { code: '8', image: 'sth', value: '8' },
      },
    };

    expect(
      gameReducer(currentState, {
        type: CALCULATE_SCORE,
      }),
    ).toEqual({
      ...currentState,
      players: {
        ...currentState.players,
        player2: { cards: [], score: 26 },
      },
    });
  });

  it('should return updated state after cleanupBoard', () => {
    const currentState = {
      ...stateExample,
      players: {
        player1: {
          cards: [],
          score: 0,
        },
        player2: {
          cards: [],
          score: 10,
        },
      },
      roundWinnerCard: {
        user: 'player2',
        card: { code: '8', image: 'sth', value: '8' },
      },
    };

    jest.mock('../../util/util', () => {
      return {
        getWinner: () => 'player2',
      };
    });

    expect(
      gameReducer(currentState, {
        type: CLEANUP_BOARD,
      }),
    ).toEqual({
      ...currentState,
      roundWinnerCard: null,
      cardsOnTable: [],
      moveInProgress: false,
      gameWinner: 'player2',
    });
  });
});
