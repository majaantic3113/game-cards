import React from 'react';
import './GameIntro.css';
import { connect } from 'react-redux';
import { setNumberOfPlayers, fetchCards } from '../store/actions/game.actions';

export const GameIntro = ({ setNumberOfPlayers, fetchCards }) => {
  const POSSIBLE_NUMBERS = [2, 3, 4];
  return (
    <>
      <h1 className="title">Select number of players</h1>
      {POSSIBLE_NUMBERS.map(elem => (
        <button
          data-testid={`game-intro-button-${elem}`}
          key={elem}
          className="button"
          onClick={() => {
            setNumberOfPlayers(elem);
            fetchCards(elem);
          }}
        >
          {elem} players
        </button>
      ))}
    </>
  );
};

export const mapDispatchToProps = dispatch => ({
  setNumberOfPlayers: numberOfPlayers =>
    dispatch(setNumberOfPlayers(numberOfPlayers)),
  fetchCards: num => dispatch(fetchCards(num)),
});

export default connect(undefined, mapDispatchToProps)(GameIntro);
