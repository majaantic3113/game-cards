import React from 'react';
import { connect } from 'react-redux';

import {
  getNumberOfPlayers,
  getLoadingState,
} from './store/selectors/selectors';
import './App.css';
import GameIntro from './GameIntro/GameIntro';
import Player from './Player/Player';
import Board from './Board/Board';
import ComputerPlayer from './ComputerPlayer/ComputerPlayer';
import loadingGif from './assets/loading.gif';

export const App = ({ numberOfPlayers, loading }) => {
  return (
    <div className="game">
      {numberOfPlayers ? (
        loading ? (
          <img src={loadingGif} alt="loading" />
        ) : (
          <div className="game-board">
            <Board />
            <Player />
            {[...Array(numberOfPlayers - 1)].map((e, i) => (
              <ComputerPlayer key={i} player={`player${i + 2}`} />
            ))}
          </div>
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
