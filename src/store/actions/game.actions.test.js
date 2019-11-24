import {
  setNumberOfPlayers,
  SET_NUMBERS_OF_PLAYERS,
  fetchCards,
  fetchCardsStart,
  fetchCardsSuccess,
  fetchCardsError,
  THROW_CARD_COMPUTER,
  throwCardComputer,
  findRoundWinner,
  FIND_ROUND_WINNER,
  calculateScore,
  CALCULATE_SCORE,
  cleanupBoard,
  CLEANUP_BOARD,
  throwCardPlayer,
  THROW_CARD_PLAYER,
  throwCards,
  throwCardsSimulation,
  cleanupBoardCallback,
} from './game.actions';
import axios from 'axios';

describe('Game actions', () => {
  describe('setNumberOfPlayers()', () => {
    it('should dispatch action with correct type and payload', () => {
      expect(setNumberOfPlayers(2)).toEqual({
        type: SET_NUMBERS_OF_PLAYERS,
        payload: 2,
      });
    });
  });

  describe('fetchCards()', () => {
    it('dispatches fetchCardsStart() action', async () => {
      axios.get = jest
        .fn()
        .mockImplementationOnce(() =>
          Promise.resolve({ data: { deck_id: 'id' } }),
        )
        .mockImplementationOnce(() => Promise.resolve({ data: { cards: [] } }));

      const dispatch = jest.fn();
      await fetchCards(2)(dispatch);
      expect(dispatch).toHaveBeenCalledWith(fetchCardsStart());

      expect(dispatch).toHaveBeenCalledWith(
        fetchCardsSuccess({ data: { cards: [] } }),
      );
    });

    it('dispatches fetchConfigError when there is an error', async () => {
      const errorMessage = 'Test error';

      axios.get = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(errorMessage));

      const dispatch = jest.fn();

      await fetchCards(2)(dispatch);

      expect(dispatch).toBeCalledWith(fetchCardsStart());
      expect(dispatch).toBeCalledWith(fetchCardsError(errorMessage));
    });
  });

  describe('throwCardsSimulation()', () => {
    it('dispatches throwCardsSimulation()', async () => {
      const dispatch = jest.fn();
      await throwCardsSimulation(2, dispatch);

      expect(dispatch).toBeCalledWith(throwCardComputer('player2'));
    });
  });

  describe('throwCards()', () => {
    it('dispatches all correct actions', async () => {
      const dispatch = jest.fn();

      await throwCards(
        { user: 'player1', card: { value: 'ACE' } },
        2,
      )(dispatch);

      expect(dispatch).toBeCalledWith(
        throwCardPlayer({ user: 'player1', card: { value: 'ACE' } }),
      );
      expect(dispatch).toBeCalledWith(findRoundWinner());
      expect(dispatch).toBeCalledWith(calculateScore());

      jest.useFakeTimers();
      jest.runAllTimers();
    });

    it('dispatches cleanupBoard', async () => {
      const dispatch = jest.fn();

      cleanupBoardCallback(dispatch);
      expect(dispatch).toBeCalledWith(cleanupBoard());
    });
  });

  describe('throwCardComputer()', () => {
    it('should dispatch action with correct type and payload', () => {
      expect(throwCardComputer('player2')).toEqual({
        type: THROW_CARD_COMPUTER,
        payload: 'player2',
      });
    });
  });

  describe('throwCardPlayer()', () => {
    it('should dispatch action with correct type and payload', () => {
      expect(throwCardPlayer({ user: 'player1', card: {} })).toEqual({
        type: THROW_CARD_PLAYER,
        payload: { user: 'player1', card: {} },
      });
    });
  });

  describe('findRoundWinner()', () => {
    it('should dispatch action with correct type and payload', () => {
      expect(findRoundWinner()).toEqual({
        type: FIND_ROUND_WINNER,
      });
    });
  });

  describe('calculateScore()', () => {
    it('should dispatch action with correct type and payload', () => {
      expect(calculateScore()).toEqual({
        type: CALCULATE_SCORE,
      });
    });
  });

  describe('cleanupBoard()', () => {
    it('should dispatch action with correct type and payload', () => {
      expect(cleanupBoard()).toEqual({
        type: CLEANUP_BOARD,
      });
    });
  });
});
