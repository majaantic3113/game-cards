import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { GameIntro, mapDispatchToProps } from './GameIntro';

describe('Test GameIntro component', () => {
  it('should render correctly', () => {
    const { container } = render(<GameIntro />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should set number of players and show Player copm', async () => {
    const props = {
      setNumberOfPlayers: jest.fn(),
      fetchCards: jest.fn(),
    };
    const { queryByTestId } = render(<GameIntro {...props} />);

    const button = queryByTestId('game-intro-button-2');

    fireEvent.click(button);

    expect(props.setNumberOfPlayers).toHaveBeenCalled();
    expect(props.fetchCards).toHaveBeenCalled();
  });
});

describe('mapDispatchToProps', () => {
  const dispatchMock = jest.fn();

  it('should provide a prop to set number of players', () => {
    const dispatchProps = mapDispatchToProps(dispatchMock);

    dispatchProps.setNumberOfPlayers(2);
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('should provide a prop to fetchCards', () => {
    const dispatchProps = mapDispatchToProps(dispatchMock);

    dispatchProps.fetchCards();
    expect(dispatchMock).toHaveBeenCalled();
  });
});
