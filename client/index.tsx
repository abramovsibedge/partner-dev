require("babel-core/register");
require("babel-polyfill");

import * as React from 'react';
import promiseMiddleware from 'redux-promise-middleware';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { routes } from './routes';


// redux
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {createLogger} from 'redux-logger';

import rootReducer from './reducers'
const logger = createLogger({duration: true});
const initialState = {};


const store: Store<any> = createStore(
	rootReducer,
	initialState,
	applyMiddleware(promiseMiddleware(
        {
            promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
        }
	))
);

render((
	<Provider store={store}>
		<Router routes={routes} history={browserHistory} />
	</Provider>
), document.getElementById('root'));