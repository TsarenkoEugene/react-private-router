import React from 'react';
import { Switch, Router, Link } from 'react-router-dom';

import { ExtendedRouter } from '../reactRouterAdvance';

import { history } from './history';

import { TestGuard } from '../guards/test.guard';

import { HomePage } from '../pages/home';
import { SecondPage } from '../pages/second';
import { ChildPage } from '../pages/second/child-page';

export const Routes = () => (
  <Router history={history}>
    <Link to="/">Home page</Link>
    <Link to="/test">Test page</Link>
    <Switch>
      {/* <ExtendedRouter exact={false} path="/home" component={HomePage} /> */}
      <ExtendedRouter
        exact={false}
        path="/test"
        redirectToChild={false}
        component={SecondPage}
        childs={[
          {
            guards: [new TestGuard()],
            path: '/test/:id',
            component: ChildPage,
          },
        ]}
      />
    </Switch>
  </Router>
);
