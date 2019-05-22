export const ADD_ROWS = '@phonebook/ADD_ROWS';
export const REMOVE_ROWS = '@phonebook/REMOVE_ROWS';

const initialState = {
  listClient: [],
  isShowFilter: false
};

const addRows = (state, action) => ({
  ...state
});

const removeRows = (state, action) => ({
  ...state
});

function phonebook (state = initialState, action) {
  switch (action.type) {
    case ADD_ROWS:
      return addRows (state, action);
    case REMOVE_ROWS:
      return removeRows (state, action);
    default:
      return state; 
  }
};

export default phonebook;