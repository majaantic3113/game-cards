import {
  getGameState,
  getNumberOfPlayers,
  getLoadingState,
  getMoveInProgress,
} from './selectors';

describe('selectors test', () => {
  it('should return game part of state', () => {
    expect(getGameState({ game: {} })).toEqual({});
  });

  it('should return numberOfPlayers part of state', () => {
    expect(getNumberOfPlayers({ game: { numberOfPlayers: 2 } })).toEqual(2);
  });

  it('should return loading part of state', () => {
    expect(
      getLoadingState({ game: { numberOfPlayers: 2, loading: true } }),
    ).toEqual(true);
  });

  it('should return moveInProgress part of state', () => {
    expect(getMoveInProgress({ game: { moveInProgress: false } })).toEqual(
      false,
    );
  });
});
