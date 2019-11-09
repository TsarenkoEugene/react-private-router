import React from 'react';
import { Switch, Router, Link } from 'react-router-dom';

import { initializeRouter } from '../reactRouterAdvance';

import { history } from './history';

import { TestGuard } from '../guards/test.guard';
import { MockDataResolver } from '../resolvers/mock-data.resolver';

import { HomePage } from '../pages/home';
import { SecondPage } from '../pages/second';
import { ChildPage } from '../pages/second/child-page';

const LoadingComponent = () => <h2>hello</h2>;
const { ExtendedRouter } = initializeRouter({ loading: LoadingComponent });

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
        resolvers={{
          testData: new MockDataResolver('Hello testData'),
          testData2: new MockDataResolver('Hello testData2'),
        }}
        childs={[
          {
            // guards: [new TestGuard()],
            path: '/test/:id',
            component: ChildPage,
            resolvers: {
              testData: new MockDataResolver('Hello testData child'),
              testData2: new MockDataResolver('Hello testData2 child'),
            },
          },
        ]}
      />
    </Switch>
  </Router>
);
