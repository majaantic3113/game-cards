import { createSelector } from 'reselect';

import {
  SET_NUMBERS_OF_PLAYERS,
  FETCH_CARDS_START,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_ERROR,
  THROW_CARD_PLAYER,
  THROW_CARD_COMPUTER,
  FIND_ROUND_WINNER,
  CALCULATE_SCORE,
  CLEANUP_BOARD,
} from '../actions/game.actions';

export const initialState = {
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

const NUMBER_OF_CARDS_PER_PLAYER = 10;

const CARD_VALUES = {
  ACE: 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  JACK: 12,
  QUEEN: 13,
  KING: 14,
};

// helpers
export const chunkArray = (myArray, chunk_size) => {
  const tempArray = [];

  for (let index = 0; index < myArray.length; index += chunk_size) {
    tempArray.push(myArray.slice(index, index + chunk_size));
  }

  return tempArray;
};

export const findGreatestCard = cards => {
  let max = cards[0];

  const checkPlayers = (element, max) => {
    const elemUser = element.user;
    const maxUser = max.user;

    return +elemUser.substr(-1) > +maxUser.substr(-1) ? element : max;
  };

  cards.forEach(element => {
    const currCardValue = CARD_VALUES[element.card.value];

    if (currCardValue > CARD_VALUES[max.card.value]) {
      max = element;
    }
    if (currCardValue === CARD_VALUES[max.card.value]) {
      max = checkPlayers(element, max);
    }
  });

  return max;
};

export const getWinner = players => {
  let winner = null;
  let max = 0;

  for (const player in players) {
    if (!winner || players[player].score > max) {
      winner = player;
      max = players[player].score;
    }
  }
  return winner;
};

/**
 * Creates new game state
 *
 * @param {initialState} state
 * @param {{type: String, payload }} action
 */
export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NUMBERS_OF_PLAYERS:
      return {
        ...state,
        numberOfPlayers: action.payload,
      };
    case FETCH_CARDS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CARDS_SUCCESS:
      const playerCards = {};

      const cardsInChunks = chunkArray(
        action.payload.data.cards,
        NUMBER_OF_CARDS_PER_PLAYER,
      );

      for (const index in cardsInChunks) {
        playerCards[`player${+index + 1}`] = {
          cards: cardsInChunks[index],
          score: 0,
        };
      }

      return {
        ...state,
        loading: false,
        players: playerCards,
      };
    case FETCH_CARDS_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case THROW_CARD_COMPUTER:
      const player = action.payload;

      const cardRandom =
        state.players[player].cards[
          Math.floor(Math.random() * state.players[player].cards.length)
        ];

      const updated = {
        ...state.players[player],
        cards: state.players[player].cards.filter(card => {
          return card.code !== cardRandom.code;
        }),
      };

      return {
        ...state,
        cardsOnTable: [
          ...state.cardsOnTable,
          { user: player, card: cardRandom },
        ],
        players: { ...state.players, [player]: updated },
        moveInProgress: true,
      };

    case THROW_CARD_PLAYER:
      const playerOnMove = action.payload.user;
      const cardThrown = action.payload.card;

      const updatedPlayer = {
        ...state.players[playerOnMove],
        cards: state.players[playerOnMove].cards.filter(card => {
          return card.code !== cardThrown.code;
        }),
      };

      return {
        ...state,
        cardsOnTable: [...state.cardsOnTable, action.payload],
        players: { ...state.players, [playerOnMove]: updatedPlayer },
        moveInProgress: true,
      };
    case FIND_ROUND_WINNER:
      const roundWinnerCard = findGreatestCard(state.cardsOnTable);

      return {
        ...state,
        roundWinnerCard,
      };
    case CALCULATE_SCORE:
      const winnerUser = state.players[state.roundWinnerCard.user];

      const sumBoard = state.cardsOnTable.reduce(
        (acc, elem) => acc + CARD_VALUES[elem.card.value],
        0,
      );

      winnerUser.score += sumBoard;

      return {
        ...state,
        players: {
          ...state.players,
          [state.roundWinnerCard.user]: winnerUser,
        },
      };
    case CLEANUP_BOARD:
      let gameWinner = null;
      if (state.players['player1'].cards.length === 0) {
        gameWinner = getWinner(state.players);
      }
      return {
        ...state,
        roundWinnerCard: null,
        cardsOnTable: [],
        moveInProgress: false,
        gameWinner,
      };
    default:
      return state;
  }
};

export default gameReducer;

/**
 * Selects game parte of the state
 * @param state
 */
export const getGameState = state => state.game;

/**
 * Selects number of players part of state
 * @param state
 */
export const getNumberOfPlayers = createSelector(
  getGameState,
  gameState => gameState.numberOfPlayers,
);

/**
 * Selects loading part of state
 * @param state
 */
export const getLoadingState = createSelector(
  getGameState,
  gameState => gameState.loading,
);

/**
 * Selects loading part of state
 * @param state
 */
export const getUserPlayerCards = createSelector(
  getGameState,
  gameState => gameState.players['player1'],
);

/**
 * Selects cardsOnTable part of state
 * @param state
 */
export const getCardsOnTable = createSelector(
  getGameState,
  gameState => gameState.cardsOnTable,
);

/**
 * Selects moveInProgress part of state
 * @param state
 */
export const getMoveInProgress = createSelector(
  getGameState,
  gameState => gameState.moveInProgress,
);

/**
 * Selects roundWinnerCard part of state
 * @param state
 */
export const getRoundWinnerCard = createSelector(
  getGameState,
  gameState => gameState.roundWinnerCard,
);
