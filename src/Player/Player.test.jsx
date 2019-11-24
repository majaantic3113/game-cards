import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Player, mapDispatchToProps } from './Player';

const props = {
  player: {
    cards: [
      { image: 'image', code: 'code' },
      { image: 'image2', code: 'code2' },
    ],
  },
  throwCards: jest.fn(),
  moveInProgress: false,
  numberOfPlayers: 2,
};

describe('Test Player component', () => {
  it('should render correctly', () => {
    const { container } = render(<Player {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should throw card on click', () => {
    const { queryByTestId } = render(<Player {...props} />);

    const card = queryByTestId('code');

    fireEvent.click(card);

    expect(props.throwCards).toHaveBeenCalled();
  });

  it('should not throw card on click if move is in progress', () => {
    const changedProps = {
      ...props,
      throwCards: jest.fn(),
      moveInProgress: true,
    };
    const { queryByTestId } = render(<Player {...changedProps} />);

    const card = queryByTestId('code');

    fireEvent.click(card);

    expect(changedProps.throwCards).toHaveBeenCalledTimes(0);
  });
});

describe('mapDispatchToProps', () => {
  const dispatchMock = jest.fn();

  it('should provide a prop to throwCards', () => {
    const dispatchProps = mapDispatchToProps(dispatchMock);

    dispatchProps.throwCards({ user: 'player1', card: { value: 'ACE' } }, 2);
    expect(dispatchMock).toHaveBeenCalled();
  });
});
