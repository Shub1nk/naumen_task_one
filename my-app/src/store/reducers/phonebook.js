export const ADD_ROWS = '@phonebook/ADD_ROWS';
export const REMOVE_ROWS = '@phonebook/REMOVE_ROWS';
export const UPDATE_ROWS = '@phonebook/UPDATE_ROWS';

const initialState = {
  id_generator: 3,
  listClients: [
    {
      id: 1,
      fullname: 'Николай Шубин',
      phonenum: '9326031699'
    },
    {
      id: 2,
      fullname: 'Иван Иванов',
      phonenum: '9326031633'
    },
    {
      id: 3,
      fullname: 'Степан Степанов',
      phonenum: '9326031699'
    }
  ],
  isShowFilter: false
};

const addRow = (state, action) => ({
    ...state,
    id_generator: state.id_generator + 1,
    listClients: state.listClients.concat(Object.assign(action.payload, {id: state.id_generator + 1}))
});

const updateRow = (state, action) => {

  const newList = state.listClients.map(item => {
    if (item.id !== action.payload.id) return item;
    return action.payload;
  });
  
  return {
    ...state,
    listClients: newList
  }
}

const removeRow = (state, action) => ({
  ...state,
  listClients: state.listClients.filter(client => client.id !== action.payload)
});

function phonebook (state = initialState, action) {
  switch (action.type) {
    case ADD_ROWS:
      return addRow (state, action);
    case REMOVE_ROWS:
      return removeRow (state, action);
    case UPDATE_ROWS:
      return updateRow (state, action);
    default:
      return state; 
  }
};

export default phonebook;