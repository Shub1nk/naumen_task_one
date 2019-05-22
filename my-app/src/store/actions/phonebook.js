import {
  ADD_ROWS,
  REMOVE_ROWS,
} from '../reducers/phonebook';

export const addRows = payload => ({
  type: ADD_ROWS,
  payload
});

export const removeRows = payload => ({
  type: REMOVE_ROWS,
  payload
});
