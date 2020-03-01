import React from 'react';
import { Switch, Router, Link } from 'react-router-dom';

import { ExtendedRouter } from '../reactRouterAdvance';

import { history } from './history';

import { TestGuard } from '../guards/test.guard';
import { MockDataResolver } from '../resolvers/mock-data.resolver';

import { HomePage } from '../pages/home';
import { SecondPage } from '../pages/second';
import { ChildPage } from '../pages/second/child-page';
import { DeeperPage } from '../pages/second/deeper-child-page';

const LoadingComponent = () => (
  <section
    style={{
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'red',
      color: 'black',
    }}
  >
    <h2>hello</h2>
  </section>
);

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
          parent: new MockDataResolver('Parent Data 1'),
          parent2: new MockDataResolver('Parent Data 2'),
        }}
        childs={[
          {
            // guards: [new TestGuard()],
            exact: false,
            path: '/test/1',
            component: ChildPage,
            redirectToChild: false,
            resolvers: {
              child: new MockDataResolver('child 1'),
              child2: new MockDataResolver('child 2'),
            },
            childs: [
              {
                // guards: [new TestGuard()],
                path: '/test/1/2',
                component: DeeperPage,
                // resolvers: {
                //   testData: new MockDataResolver('Hello testData child'),
                //   testData2: new MockDataResolver('Hello testData2 child'),
                // },
              },
            ],
          },
          {
            // guards: [new TestGuard()],
            exact: false,
            path: '/test/home/:id',
            component: ChildPage,
            redirectToChild: false,
            resolvers: {
              child: new MockDataResolver('child 1'),
              child2: new MockDataResolver('child 2'),
            },
          },
        ]}
      />
      <ExtendedRouter exact={true} path="/" component={() => <h2>Home Page</h2>} />
    </Switch>
  </Router>
);
