import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App } from './routes/app.js';
import { Main } from './routes/main/';
import { Auth } from './routes/auth/';
import { Reset } from './routes/auth/reset';
import { Signin } from './routes/auth/signin';
import { Signup } from './routes/auth/signup';
import { Projects } from './routes/projects/';
import { Subscribers } from './routes/subscribers/';
import { NotFound } from './routes/404/';

export const routes = (
  <Route path='/' component={App}>
    <IndexRoute title='App' component={Main} />
    <Route path='projects' title='Projects' component={Projects} />
    <Route path='subscribers' title='Subscribers' component={Subscribers} />
    <Route path='auth' title='Auth' component={Auth}>
        <Route path='reset' title='Reset' component={Reset} />
        <Route path='signin' title='App - About' component={Signin} />
        <Route path='signup' title='App - About' component={Signup} />
    </Route>
    <Route path='*' title='404: Not Found' component={NotFound} />
  </Route>
);

export default routes;
