import React from 'react';
import { render } from '@testing-library/react';
import { GameIntro, mapDispatchToProps } from './GameIntro';

describe('Test GameIntro component', () => {
  it('should render correctly', () => {
    const { container } = render(<GameIntro />);

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  const dispatchMock = jest.fn();

  it('should provide a prop to set mobile layout', () => {
    const dispatchProps = mapDispatchToProps(dispatchMock);

    dispatchProps.setNumberOfPlayers(2);
    expect(dispatchMock).toHaveBeenCalled();
  });
});
