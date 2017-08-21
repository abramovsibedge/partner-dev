import * as React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

// redux
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {createLogger} from 'redux-logger';


import { routes } from './routes';


import rootReducer from './reducers'
const logger = createLogger({duration: true});
const initialState = {};


const store: Store<any> = createStore(rootReducer, initialState, applyMiddleware(logger));

render((
    <Provider store={store}>
        <Router routes={routes} history={browserHistory} />
    </Provider>
), document.getElementById('root'));