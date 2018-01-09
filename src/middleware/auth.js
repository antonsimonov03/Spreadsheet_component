import { GET_ACCESS, LOGIN_FAILURE, LOGIN_SUCCESS } from '../constants';

const AUTH_API = 'http://localhost:3001/home/protected';

export default store => next => action => {
  if (action.type !== GET_ACCESS) {
    return next(action);
  }

  let token = localStorage.getItem('id_token') || null
  let config = {}

  if (token) {
    config = {
      headers: { 'Authorization': `Bearer ${token}` }
    }
  }

  console.log(config, 'CONFIG');

  return fetch(AUTH_API, config)
    .then(res => {
      if (res.statusText === 'Unauthorized') {
        return next({
          type: LOGIN_FAILURE,
          errorMessage: res.statusText
        })
      } else {
        return next({
          type: LOGIN_SUCCESS
        })
      }
    })
}