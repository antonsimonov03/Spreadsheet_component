import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
} from '../constants';

let initialState = {
  isLoading: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        isAuthenticated: false,
        user: action.credentials
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    default:
      return state
  }
}