import React from 'react';
import { connect } from 'react-redux';
import './Player.css';
import {
  getUserPlayerCards,
  getMoveInProgress,
  getNumberOfPlayers,
} from '../store/reducers/game.reducer';
import { throwCards } from '../store/actions/game.actions';

const Player = ({ player, throwCards, moveInProgress, numberOfPlayers }) => {
  return (
    <div>
      {player.cards.map(card => (
        <img
          onClick={() => {
            if (moveInProgress) {
              return;
            }
            throwCards({ user: 'player1', card: card }, numberOfPlayers);
          }}
          className="card-image"
          key={card.code}
          src={card.image}
          alt={card.code}
        />
      ))}
    </div>
  );
};

export const mapStateToProps = state => ({
  player: getUserPlayerCards(state),
  moveInProgress: getMoveInProgress(state),
  numberOfPlayers: getNumberOfPlayers(state),
});

export const mapDispatchToProps = dispatch => ({
  throwCards: (cardThrownData, numberOfPlayers) =>
    dispatch(throwCards(cardThrownData, numberOfPlayers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
