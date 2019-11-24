import React from 'react';
import { connect } from 'react-redux';

import {
  getNumberOfPlayers,
  getLoadingState,
} from './store/reducers/game.reducer';
import './App.css';
import GameIntro from './GameIntro/GameIntro';
import Player from './Player/Player';
import Board from './Board/Board';
import ComputerPlayer from './ComputerPlayer/ComputerPlayer';

export const App = ({ numberOfPlayers, loading }) => {
  return (
    <div className="game">
      {numberOfPlayers ? (
        loading ? (
          'loading'
        ) : (
          <>
            <Board />
            <Player />
            {[...Array(numberOfPlayers - 1)].map((e, i) => (
              <ComputerPlayer player={`player${i + 2}`} />
            ))}
          </>
        )
      ) : (
        <GameIntro />
      )}
    </div>
  );
};

export const mapStateToProps = state => ({
  numberOfPlayers: getNumberOfPlayers(state),
  loading: getLoadingState(state),
  state: state,
});

export default connect(mapStateToProps)(App);
