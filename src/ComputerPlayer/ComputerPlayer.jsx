import React from 'react';
import { connect } from 'react-redux';
import './ComputerPlayer.css';
import cardBackground from '../assets/card-background.png';

export const ComputerPlayer = ({ player, playerCardsLength, playerScore }) => {
  return (
    <div className={`computer-player computer-${player}`}>
      <div className="computer-player-score">
        Player {player.substr(-1)}: {playerScore}
      </div>
      {[...Array(playerCardsLength)].map((_, i) => (
        <img
          className="computer-player-img"
          key={i}
          src={cardBackground}
          alt="background"
        />
      ))}
    </div>
  );
};

export const mapStateToProps = (state, ownProps) => {
  return {
    playerCardsLength:
      state.game.players[ownProps.player] &&
      state.game.players[ownProps.player].cards.length,
    playerScore:
      state.game.players[ownProps.player] &&
      state.game.players[ownProps.player].score,
  };
};

export default connect(mapStateToProps)(ComputerPlayer);
