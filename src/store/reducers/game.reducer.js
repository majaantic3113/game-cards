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
import { findGreatestCard, chunkArray, getWinner } from '../../util/util';
import { CARD_VALUES, NUMBER_OF_CARDS_PER_PLAYER } from '../../config';

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
      console.log(state.cardsOnTable);
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
