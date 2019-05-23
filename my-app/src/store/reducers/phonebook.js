export const ADD_ROWS = '@phonebook/ADD_ROWS';
export const REMOVE_ROWS = '@phonebook/REMOVE_ROWS';

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

// const addRows = (state, action) => ({
//     ...state,
//     id_generator: state.id_generator++,
//     listClients: state.listClients.push(action.payload)
// });
const addRows = (state, action) => ({
    ...state,
    id_generator: state.id_generator + 1,
    listClients: state.listClients.concat(
      Object.assign(
        action.payload, 
        {
          id: state.id_generator + 1
        }
      )
    )
});

const removeRows = (state, action) => ({
  ...state,
  listClients: state.listClients.filter(client => client.id !== action.payload)
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