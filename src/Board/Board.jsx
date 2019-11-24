import React from 'react';
import { connect } from 'react-redux';

import './Board.css';

import {
  getCardsOnTable,
  getRoundWinnerCard,
  getGameWinner,
} from '../store/selectors/selectors';

export const Board = ({ cardsOnTable, roundWinnerCard, gameWinner }) => {
  return (
    <div className="board">
      {gameWinner && <h1 className="game-winner">Game winner: {gameWinner}</h1>}
      {cardsOnTable.map(card => {
        const winnerStyle = 'board-image board-winner';
        if (roundWinnerCard && roundWinnerCard.user === card.user) {
        }
        return (
          <img
            className={
              roundWinnerCard && roundWinnerCard.user === card.user
                ? winnerStyle
                : 'board-image'
            }
            src={card.card.image}
            key={card.card.code}
            alt={card.card.code}
          ></img>
        );
      })}
    </div>
  );
};

export const mapStateToProps = state => ({
  cardsOnTable: getCardsOnTable(state),
  roundWinnerCard: getRoundWinnerCard(state),
  gameWinner: getGameWinner(state),
});

export default connect(mapStateToProps)(Board);
