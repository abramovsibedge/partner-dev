require("babel-core/register");
require("babel-polyfill");

import * as React from 'react';
import promiseMiddleware from 'redux-promise-middleware';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { routes } from './routes';
import { loadState, saveState } from './utils/storage';


// redux
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {createLogger} from 'redux-logger';

import rootReducer from './reducers'
const logger = createLogger({duration: true});


const persistedstate = loadState();

const store: Store<any> = createStore(
	rootReducer,
    persistedstate,
	applyMiddleware(promiseMiddleware(
        {
            promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
        }
	))
);

store.subscribe(()=>{
	saveState(store.getState());
});


render((
	<Provider store={store}>
		<Router routes={routes} history={browserHistory} />
	</Provider>
), document.getElementById('root'));


