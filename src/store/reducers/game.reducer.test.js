import { gameReducer, initialState } from './game.reducer';
import { SET_NUMBERS_OF_PLAYERS } from '../actions/game.actions';

describe('game reducer test', () => {
  it('should return updated state', () => {
    expect(
      gameReducer(initialState, { type: SET_NUMBERS_OF_PLAYERS, payload: 2 }),
    ).toEqual({ numberOfPlayers: 2 });
  });
});
