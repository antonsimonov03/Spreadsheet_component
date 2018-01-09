import { createStore, applyMiddleware } from 'redux'

import reducer from '../reducer';
import auth from '../middleware/auth';

let createStoreWithMiddleware = applyMiddleware(auth)(createStore)

let store = createStoreWithMiddleware(reducer)

export default store;