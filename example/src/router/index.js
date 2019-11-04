import React from 'react';
import { Switch, Router, Link } from 'react-router-dom';

import { CustomRoute } from '../reactRouterAdvance';

import { history } from './history';

import { HomePage } from '../pages/home';
import { SecondPage } from '../pages/second';
import { ChildPage } from '../pages/second/child-page';

export const Routes = () => (
  <Router history={history}>
    <Link to="/">Home page</Link>
    <Link to="/test">Test page</Link>
    <Switch>
      <CustomRoute exact={true} path="/" component={HomePage} />
      <CustomRoute
        // exact={true}
        path="/test"
        redirectToChild={null}
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
