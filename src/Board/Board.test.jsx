import React from 'react';
import { render } from '@testing-library/react';
import { Board, mapStateToProps } from './Board';

describe('Test Board component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Board
        cardsOnTable={[
          { user: 'player1', card: { image: '1', code: '1' } },
          { user: 'player2', card: { image: '2', code: '2' } },
        ]}
        roundWinnerCard={{ user: 'player1', card: { image: '1', code: '1' } }}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
