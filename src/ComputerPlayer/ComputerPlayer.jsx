import React from 'react';
import { connect } from 'react-redux';
import './ComputerPlayer.css';
import cardBackground from '../assets/card-background.png';

const ComputerPlayer = ({ player, playerCardsLength }) => {
  return (
    <div className={`computer-player computer-${player}`}>
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
    playerCardsLength: state.game.players[ownProps.player].cards.length,
  };
};

export default connect(mapStateToProps)(ComputerPlayer);
