import {
  ADD_ROWS,
  REMOVE_ROWS,
  UPDATE_ROWS
} from '../reducers/phonebook';

export const addRow = payload => ({
  type: ADD_ROWS,
  payload
});

export const removeRow = payload => ({
  type: REMOVE_ROWS,
  payload
});

export const updateRow = payload => ({
  type: UPDATE_ROWS,
  payload
});
