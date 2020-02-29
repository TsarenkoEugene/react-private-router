import React from 'react';
import { Switch, Router } from 'react-router-dom';

import { ExtendedRouter } from '../../../src/reactRouterAdvance';
import { HomePage } from '../pages/new/home-page';
import { IndependentPage } from '../pages/new/independent-page';
import { TabPage } from '../pages/new/tab-page';

import { StaticChild } from '../pages/new/tab-page/static-child-page';
import { SecondStaticChild } from '../pages/new/tab-page/second-static-child-page';
import { DynamicPathChildPage } from '../pages/new/tab-page/dynamic-path-child-page';
import { DynamicParentStaticChild } from '../pages/new/tab-page/dynamic-path-child-page/static-child';
import { DynamicParentSecondStaticChild } from '../pages/new/tab-page/dynamic-path-child-page/second-static-child';

import { history } from './history';

export const Routes = () => (
  <Router history={history}>
    <Switch>
      <ExtendedRouter path="/" exact={true} component={HomePage} />
      <ExtendedRouter exact={true} path="/independant-page" component={IndependentPage} />
      <ExtendedRouter
        path="/tab-page"
        component={TabPage}
        childs={[
          {
            component: StaticChild,
            path: '/tab-page/static-child',
          },
          {
            path: '/tab-page/second-static-child',
            component: SecondStaticChild,
          },
          {
            path: '/tab-page/dynamic-path-child-page/:id',
            component: DynamicPathChildPage,
            childs: [
              {
                path: '/tab-page/dynamic-path-child-page/:id/static-child',
                component: DynamicParentStaticChild,
              },
              {
                path: '/tab-page/dynamic-path-child-page/bbbbb/second-static-child',
                component: DynamicParentSecondStaticChild,
              },
            ],
          },
        ]}
      />
    </Switch>
  </Router>
);
