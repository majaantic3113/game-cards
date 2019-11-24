import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import gameReducer from './reducers/game.reducer';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const store = createStore(
  combineReducers({ game: gameReducer }),
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
