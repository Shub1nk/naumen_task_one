import {
  ADD_ROWS,
  REMOVE_ROWS,
  UPDATE_ROWS,
  UPDATE_ID_ACTIVE
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

export const updateIdActive = payload => ({
  type: UPDATE_ID_ACTIVE,
  payload
});