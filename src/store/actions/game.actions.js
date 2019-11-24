import axios from 'axios';

export const SET_NUMBERS_OF_PLAYERS = '[PLAYERS] Set number of players';
export const FETCH_CARDS_START = '[CARDS] Fetch CARDS start';
export const FETCH_CARDS_SUCCESS = '[CARDS] Fetch CARDS success';
export const FETCH_CARDS_ERROR = '[CARDS] Fetch CARDS error';
export const THROW_CARD_COMPUTER = '[Cards] Throw card computer';
// player action
export const THROW_CARD_PLAYER = '[THROW CARD PLAYER] Throw card player';
export const FIND_ROUND_WINNER = '[ROUND END] Find round winner';
export const CALCULATE_SCORE = '[SCORE] Calculate score';
export const CLEANUP_BOARD = 'Clean up board';

/**
 * Returns an action for fetching CARDS
 */
export const fetchCardsStart = () => ({ type: FETCH_CARDS_START });

/**
 * Returns an action with CARDS data
 * @param {*} payload
 */
export const fetchCardsSuccess = payload => ({
  type: FETCH_CARDS_SUCCESS,
  payload,
});

/**
 * Returns an action with error when CARDS fetch fails
 * @param {Error} error
 */
export const fetchCardsError = error => ({
  type: FETCH_CARDS_ERROR,
  error,
});

/**
 * Fetches CARDS and dispatches success and error actions
 */
export const fetchCards = numberOfPlayers => {
  return async dispatch => {
    try {
      dispatch(fetchCardsStart());

      const deck = await axios.get(
        'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
      );

      const deckId = deck.data.deck_id;

      const cards = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numberOfPlayers *
          10}`,
      );

      dispatch(fetchCardsSuccess(cards));
    } catch (err) {
      dispatch(fetchCardsError(err));
    }
  };
};

/**
 * Action for setting number of players
 * @param payload
 */
export const setNumberOfPlayers = payload => ({
  type: SET_NUMBERS_OF_PLAYERS,
  payload,
});

export const throwCardsSimulation = (numberOfPlayers, dispatch) => {
  return new Promise(resolve => {
    for (let index = 1; index < numberOfPlayers; index++) {
      setTimeout(() => {
        dispatch(throwCardComputer(`player${index + 1}`));
      }, 500 * index);
    }
    setTimeout(resolve, 500 * numberOfPlayers);
  });
};

export const cleanupBoardCallback = dispatch => {
  dispatch(cleanupBoard());
};

export const throwCards = (userMove, numberOfPlayers) => {
  return async dispatch => {
    dispatch(throwCardPlayer(userMove));

    await throwCardsSimulation(numberOfPlayers, dispatch);
    dispatch(findRoundWinner());
    dispatch(calculateScore());

    setTimeout(cleanupBoardCallback.bind(null, dispatch), 1500);
  };
};

export const throwCardComputer = payload => {
  return {
    type: THROW_CARD_COMPUTER,
    payload,
  };
};

/**
 * Action for throwing card
 * @param payload
 */
export const throwCardPlayer = payload => {
  return {
    type: THROW_CARD_PLAYER,
    payload,
  };
};

/**
 * Action for deciding on round winner
 */
export const findRoundWinner = () => {
  return {
    type: FIND_ROUND_WINNER,
  };
};

export const calculateScore = () => {
  return {
    type: CALCULATE_SCORE,
  };
};

/**
 * Action for cleaning out round winner and cards on board
 */
export const cleanupBoard = () => {
  return {
    type: CLEANUP_BOARD,
  };
};
