import * as React from 'react';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {createLogger} from 'redux-logger';

import reducers from './reducers/index';

//components
import Main from './containers/Main';

// middleware
// import promiseMiddleware from './middleware/promiseMiddleware';

// logger
const logger = createLogger();

//store
var store = createStore(reducers, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={Main} />
        </Router>
    </Provider>,
    document.getElementById('root')
);
