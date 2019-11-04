import React from 'react';
import { Switch, Router, Link } from 'react-router-dom';

import { ExtendedRouter } from '../reactRouterAdvance';

import { history } from './history';

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
            path: '/test/1234',
            component: ChildPage,
          },
        ]}
      />
      {/* <TestComponent text="Styled Component from React library" /> */}
    </Switch>
  </Router>
);
