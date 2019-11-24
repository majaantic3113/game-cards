import React from 'react';
import { render } from '@testing-library/react';
import { App, mapStateToProps } from './App';
import { Provider } from 'react-redux';
import store from './store';

describe('Test App component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <App numberOfPlayers={2} />
      </Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('mapStateToProps', () => {
  it('should provide number of players prop', () => {
    const state = { game: { numberOfPlayers: 2 } };

    expect(mapStateToProps(state)).toHaveProperty('numberOfPlayers');
  });
});
