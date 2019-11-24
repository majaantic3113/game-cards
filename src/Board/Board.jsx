import React from 'react';
import { connect } from 'react-redux';

import './Board.css';
import {
  getCardsOnTable,
  getRoundWinnerCard,
} from '../store/reducers/game.reducer';

const Board = ({ cardsOnTable, roundWinnerCard }) => {
  return (
    <div>
      {cardsOnTable.map(card => {
        const winnerStyle = 'board-winner';
        if (roundWinnerCard && roundWinnerCard.user === card.user) {
        }
        return (
          <img
            className={
              roundWinnerCard && roundWinnerCard.user === card.user
                ? winnerStyle
                : ''
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
});

export default connect(mapStateToProps)(Board);
