import { setNumberOfPlayers, SET_NUMBERS_OF_PLAYERS } from './game.actions';

describe('Game actions', () => {
  describe('setNumberOfPlayers()', () => {
    it('should dispatch action with correct type and payload', () => {
      expect(setNumberOfPlayers(2)).toEqual({
        type: SET_NUMBERS_OF_PLAYERS,
        payload: 2,
      });
    });
  });
});
