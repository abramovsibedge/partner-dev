require("babel-core/register");
require("babel-polyfill");

import * as React from 'react';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';

import { routes } from './routes';
import rootReducer from './reducers'

const store: Store<any> = createStore(
	rootReducer,
	applyMiddleware(promiseMiddleware({
		promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
	}), thunk)
);

render((
	<Provider store={store}>
		<Router routes={routes} history={hashHistory} />
	</Provider>
), document.getElementById('root'));