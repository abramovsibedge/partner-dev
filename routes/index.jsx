import express from 'express';
import request from 'request';

import React, {Component} from 'react';
import {renderToString, reactDomServer, renderToStaticMarkup} from 'react-dom/server';

import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import routes from '../app/routers/routes';
import reducers from '../app/reducers';

import Fs from 'fs';

/*eslint-disable*/
const router = express.Router();
/*eslint-enable*/

const store = createStore(reducers, applyMiddleware(thunk));

router.get('*', (req, res) => {

    const branch = matchRoutes(routes, req.url);

    const promises = branch.map(({route}) => {
        let fetchData = route.component.fetchData;
        return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null)
    });


    return Promise.all(promises).then((data) => {
        let context = {};
        const content = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    {renderRoutes(routes)}
                </StaticRouter>
            </Provider>
        );
        if (context.status === 404) {
            res.status(404);
        }
        if (context.status === 302) {
            return res.redirect(302, context.url);
        }

        let stores = JSON.stringify(store.getState());

        // create file
        let htmlName = '';
        (req.url == "/") ? htmlName = 'main' : htmlName = req.url.slice(1);
        let listrouters = branch[0].route.routes;

        for (let i=0; i<listrouters.length; i++) {
            if (req.url == listrouters[i].path) {
                let htmlcontent = "<!DOCTYPE html>\n" +
                    "<html>\n" +
                    "<head>\n" +
                    "    <title>Express</title>\n" +
                    "\n" +
                    "    <script type=\"text/javascript\" charset=\"utf-8\">\n" +
                    "        window.__INITIAL_STATE__ = "+stores+"" +
                    "    </script>\n" +
                    "\n" +
                    "</head>\n" +
                    "<body>\n" +
                    "<div id=\"app\">"+content+"</div>\n" +
                    "<script type=\"text/javascript\" src=\"../build/bundle.js\"></script>\n" +
                    "</body>\n" +
                    "</html>";

                Fs.writeFile('./public/html/'+htmlName+".html", htmlcontent, function(err) {
                    if (err) {return console.log(err)}});
                break;
            }
        }

        res.render('index', {title: 'Express', stores: stores, data: content });
    });
});

module.exports = router;