import React from 'react';
import { Switch, Route, Router } from 'react-router';
import { Provider } from 'react-redux';

import { GET_ACCESS } from '../constants';

import App from '../containers/App';
import TablePage from '../containers/Table';
import NotFound from '../containers/NotFound';

import store from '../store';

import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

export default class Routes extends React.Component {
  componentDidMount() {
    store.dispatch({
      type: GET_ACCESS
    })
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/create-session" component={App} />
            <Route exact path="/table" component={TablePage}/>
            <Route path='*' exact component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}