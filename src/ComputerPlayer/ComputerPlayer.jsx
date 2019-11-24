import React from 'react';
import { connect } from 'react-redux';

const ComputerPlayer = props => {
  return <div></div>;
};

export const mapStateToProps = (state, ownProps) => {
  return {
    player: state.game.players[ownProps.player],
  };
};

export default connect(mapStateToProps)(ComputerPlayer);
