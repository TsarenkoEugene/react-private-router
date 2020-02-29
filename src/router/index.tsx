import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ExtendedRouterProps, ExtentedRouterStatus, InitializeRouter } from './types';
import { useManager, useTimer, useLoadingManager, usePathCollector } from './hooks';

const pathCollector = usePathCollector();

import { checkGuards, isPathMatched, setKey, isChildPathStartWithParent, routeHelper } from './helpers';
// const initializeRouter = ({ loading }: InitializeRouter = {}) => {
// const Loading = loading;
// const loadingManager = useLoadingManager();

export const ExtendedRouter = ({
  path,
  component: Component,
  redirectUrl,
  guards = [],
  resolvers = {},
  debounceWaitTime = 500,
  childs = [],
  redirectToChild,
  exact,
  location,
}: ExtendedRouterProps) => {
  if (typeof location === 'undefined') {
    throw new Error('Extended router must be wrapper in usual router!');
  }
  const routerInfo = routeHelper({
    path,
    component: Component,
    redirectUrl,
    guards,
    resolvers,
    debounceWaitTime,
    childs,
    redirectToChild,
    exact,
    location,
    currentPath: location.pathname,
  });
  // const routerManager = useManager(location.pathname, path, resolvers, childs);
  const routerManager = useManager({ resolvers, guards });
  // const timerManager = useTimer();

  // const clearTimer = (guardStatus: ExtentedRouterStatus) => {
  //   if (guardStatus === ExtentedRouterStatus.SUCCESS || guardStatus === ExtentedRouterStatus.FAIL) {
  //     timerManager.clearTimer();
  //   }
  // };

  const [status, setStatus] = useState(ExtentedRouterStatus.INITIAL);

  const resultComponents = {
    [ExtentedRouterStatus.INITIAL]: null,
    [ExtentedRouterStatus.LOADING]: <h1>Loading</h1>,
    [ExtentedRouterStatus.SUCCESS]: null,
    [ExtentedRouterStatus.FAIL]: <Redirect to={redirectUrl || '/'} />,
  };

  // loadingManager.passMessage(`Hello ${path}`);

  useEffect(() => {
    (async () => {
      // loadingManager.setPath({ currentPath: location.pathname, path, childs });

      const isMatch = isPathMatched(location.pathname, path);

      if (isMatch) {
        // console.log('path has child', routerInfo.hasChildren());
        // console.log('path from main', location.pathname, path);
        // console.log({ isLast, currPath: location.pathname, path });

        if (routerInfo.hasChildren()) {
          pathCollector.addPath(path as string);
        }
        // if ()

        // timerManager.startTimer(debounceWaitTime, () => {
        //   // console.log(loadingManager.isLoading());
        //   // if (!loadingManager.isParentLoadingActive()) {
        //   //   setStatus(ExtentedRouterStatus.LOADING);
        //   //   loadingManager.setParentLoadingActive();
        //   // }
        //   // loadingManager.pathIsLoading(path);
        // });
        // if (routerInfo.isNeedSkipExtraWork()) {
        //   setStatus(ExtentedRouterStatus.SUCCESS);
        // } else {
        const guardStatus = await routerManager.checkGuards();

        if (guardStatus === ExtentedRouterStatus.SUCCESS && Object.keys(resolvers).length) {
          await routerManager.loadResolvers();
        }

        const isLastChild = routerInfo.isFinalRoute();
        if (isLastChild) {
          // console.log('last child!', path);
          const time = pathCollector.getLoadingTime(path as string);
          console.log(time + 'ms');
        }
        // // loadingManager.loadingDone(path);

        setStatus(guardStatus);
        // }

        // clearTimer(guardStatus);
      }
    })();
  }, [location.pathname]);

  if (status === ExtentedRouterStatus.SUCCESS) {
    // If the status of the guards is passed
    if (childs.length) {
      const childRoutes = childs.map(route => {
        const isValidChildPath = isChildPathStartWithParent(route.path, path);
        if (!isValidChildPath) {
          throw new Error(`Child must start with parent path; Parent ${path} Child ${route.path}`);
        }
        return <ExtendedRouter {...route} key={setKey(route.path)} redirectUrl={redirectUrl} location={location} />;
      });
      return (
        <Route
          exact={exact}
          path={path}
          render={props => {
            if (childs.length && props.location.pathname === path && redirectToChild !== false) {
              const childRedirectUrl = redirectToChild || childs[0].path;
              props.history.push(childRedirectUrl as string);
              return;
            }

            return <Component {...props} exact={exact} childRoutes={childRoutes} {...routerManager.getProps()} />;
          }}
        />
      );
    }

    return <Route exact={exact} path={path} render={props => <Component {...props} {...routerManager.getProps()} />} />;
  }
  // Return only loading or INITIAL
  return resultComponents[status];
};

// };

// export default initializeRouter;
//
