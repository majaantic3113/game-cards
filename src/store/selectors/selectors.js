import { createSelector } from 'reselect';
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

/**
 * Selects gameWinner part of state
 * @param state
 */
export const getGameWinner = createSelector(
  getGameState,
  gameState => gameState.gameWinner,
);
