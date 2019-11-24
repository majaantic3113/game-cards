import React from 'react';
import { render } from '@testing-library/react';
import { ComputerPlayer } from './ComputerPlayer';

describe('Test ComputerPlayer component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <ComputerPlayer
        player="player2"
        playerCardsLength={10}
        playerScore={0}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
