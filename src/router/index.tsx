import React, { useState, useEffect, useRef } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ExtendedRouterProps, ExtentedRouterStatus } from './types';

import { checkGuards, isPathMatched, setKey, isChildPathStartWithParent } from './helpers';

const ExtendedRouter = ({
  path,
  component,
  redirectUrl,
  guards = [],
  resolvers = [],
  debounceWaitTime = 500,
  childs = [],
  redirectToChild,
  exact,
  location,
}: ExtendedRouterProps) => {
  if (typeof location === 'undefined') {
    throw new Error('Extended router must be wrapper in usual router!');
  }
  const savedTimer = useRef(0);
  const savedTime = useRef(Date.now());

  const [status, setStatus] = useState(ExtentedRouterStatus.INITIAL);

  const resultComponents = {
    [ExtentedRouterStatus.INITIAL]: null,
    [ExtentedRouterStatus.LOADING]: <h1>Loading</h1>,
    [ExtentedRouterStatus.SUCCESS]: null,
    [ExtentedRouterStatus.FAIL]: <Redirect to={redirectUrl || '/'} />,
  };

  const startTimer = () => {
    savedTimer.current = setInterval(() => {
      if (savedTime.current + debounceWaitTime < Date.now()) {
        setStatus(ExtentedRouterStatus.LOADING);
      }
    }, 30);
  };
  const clearTimer = (guardStatus: ExtentedRouterStatus) => {
    if (guardStatus === ExtentedRouterStatus.SUCCESS || guardStatus === ExtentedRouterStatus.FAIL) {
      clearInterval(savedTimer.current);
    }
  };
  useEffect(() => {
    (async () => {
      const isMatch = isPathMatched(location.pathname, path);

      if (isMatch) {
        startTimer();

        const guardStatus = guards.length ? await checkGuards(guards) : ExtentedRouterStatus.SUCCESS;

        if (status === ExtentedRouterStatus.SUCCESS && resolvers.length) {
          const promises = resolvers.map(resolver => resolver.Resolve());
          await Promise.all(promises).catch(e => {
            console.error('Error in resolvers');
            console.error(e);
          });
        }

        setStatus(guardStatus);

        clearTimer(guardStatus);
      }
    })();
  }, [location.pathname]);

  const Component = component;
  if (status === ExtentedRouterStatus.SUCCESS) {
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

            return <Component {...props} exact={exact} childRoutes={childRoutes} />;
          }}
        />
      );
    }

    return <Route exact={exact} path={path} render={props => <Component {...props} />} />;
  }

  return resultComponents[status];
};

// const initializeRouter = () =>

export default ExtendedRouter;
