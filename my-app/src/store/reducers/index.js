import { combineReducers } from 'redux';

import phonebook from './phonebook'

const rootReducer = combineReducers({
  phonebook
});

export default rootReducer;