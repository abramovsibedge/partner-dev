import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {createLogger} from 'redux-logger';

import counterApp  from './reducers/index';

//components
import Main from './containers/Main';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// logger
const logger = createLogger();

//store
var store = createStore(counterApp , applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root')
);
