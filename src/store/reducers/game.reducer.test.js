import {
  gameReducer,
  initialState,
  getGameState,
  getNumberOfPlayers,
} from './game.reducer';
import { SET_NUMBERS_OF_PLAYERS } from '../actions/game.actions';

describe('game reducer test', () => {
  it('should return updated state', () => {
    expect(
      gameReducer(initialState, { type: SET_NUMBERS_OF_PLAYERS, payload: 2 }),
    ).toEqual({ numberOfPlayers: 2 });
  });

  it('should return game part of state', () => {
    expect(getGameState({ game: {} })).toEqual({});
  });

  it('should return numberOfPlayers part of state', () => {
    expect(getNumberOfPlayers({ game: { numberOfPlayers: 2 } })).toEqual(2);
  });
});
