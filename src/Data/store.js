import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const allPosts = (state=[], action) => {
  var nuevoEstado = Object.assign({}, state);
  switch (action.type) {
    case 'DATA_LOADED':      
      nuevoEstado = state.concat(action.data)  
    return nuevoEstado;
    case 'CLEAR_DATA' :
      nuevoEstado = [];
    return nuevoEstado;
    default:
        return state;
  }
}

const userCreated = (state={}, action) => {
  var nuevoEstado = Object.assign({}, state);
  switch(action.type) {
    case 'USER_CREATED':
      nuevoEstado = {mensaje: "El usuario se creó con éxito"};
      return nuevoEstado;
    case 'USER_ERROR':
      nuevoEstado = {mensaje: "El usuario no se creó"};
      return nuevoEstado;
    default:
      return {};
  }
}

const session = (state=null, action) => {
  var nuevoEstado = Object.assign({}, state);
  switch(action.type) {
    case 'LOGIN':
      nuevoEstado = action.data;
      return nuevoEstado;
    case 'LOGOUT':
      nuevoEstado = null;
      return nuevoEstado;
    default:
      return state;

  }
}
const pagination = (state={total:1, page:1}, action) => {
  let nuevoEstado = Object.assign({}, state);
  switch (action.type) {
    case 'SET_CURRENT':
      nuevoEstado.page = action.page;
      return nuevoEstado;
    default:
      return state;
  }
}
const reducer = combineReducers({
  allPosts: allPosts,
  form: formReducer,
  userStatus: userCreated,
  login: session,
  pagination: pagination 
});

export const store = createStore(reducer);