import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS } from '../constants';

export function requestLogin(credentials) {
  return {
    type: LOGIN_REQUEST,
    isLoading: true,
    isAuthenticated: false,
    credentials
  }
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isLoading: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

export function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isLoading: false,
    isAuthenticated: false,
    message
  }
}
