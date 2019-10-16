import { combineReducers } from 'redux';
import gameReducer from './game/reducer';

const appReducers = {
  game: gameReducer,
};

const reducers = combineReducers(appReducers);

export default reducers;
