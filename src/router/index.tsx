import React, { useState, useEffect, useRef } from 'react';
import { Redirect, Route, matchPath } from 'react-router-dom';
// import { matchPattern } from 'typed-url-matcher';
// import test from 'url-matcher';
// import LoadingPage from '@common/components/loading-page';
import { OwnProps } from './types';
// import classNames from 'classnames';

// const ExtentedRouterStatus = {
//   INITIAL: 'initial',
//   LOADING: 'loading',
//   SUCCESS: 'success',
//   FAIL: 'fail',
// };

enum ExtentedRouterStatus {
  INITIAL,
  LOADING,
  SUCCESS,
  FAIL,
}

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
}: OwnProps) => {
  if (typeof location === 'undefined') {
    throw new Error('Extended router must be wrapper in usual router!');
  }
  const savedTimer = useRef(0);
  const savedTime = useRef(Date.now());

  const [status, setStatus] = useState(ExtentedRouterStatus.INITIAL);

  const resultComponents = {
    [ExtentedRouterStatus.INITIAL]: null,
    [ExtentedRouterStatus.LOADING]: null,
    [ExtentedRouterStatus.SUCCESS]: null,
    [ExtentedRouterStatus.FAIL]: <Redirect to={redirectUrl || '/'} />,
  };

  const checkGuards = async () => {
    const result = [];
    for (const guard of guards) {
      try {
        const guardResult = await guard.CanActivate();
        result.push(guardResult);
      } catch (e) {
        result.push(false);
        console.error('Error in guards');
        console.error(e);
      }
    }
    const isOk = !result.some(i => !i);

    return isOk ? ExtentedRouterStatus.SUCCESS : ExtentedRouterStatus.FAIL;
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
      const match = matchPath(location.pathname, {
        path,
        exact: false,
        strict: true,
      });

      if ((match && match.isExact) || location.pathname.startsWith(path)) {
        startTimer();

        const guardStatus = guards.length ? await checkGuards() : ExtentedRouterStatus.SUCCESS;

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

  const compareChildAndParentPath = (childPath: string, parentPath: string) => childPath.startsWith(parentPath);

  const Component = component;
  if (status === ExtentedRouterStatus.SUCCESS) {
    if (childs.length) {
      const childRoutes = childs.map(route => {
        const isValidChildPath = compareChildAndParentPath(route.path, path);
        if (!isValidChildPath) {
          throw new Error(`Child must start with parent path; Parent ${path} Child ${route.path}`);
        }
        return <ExtendedRouter {...route} key={route.path} redirectUrl={redirectUrl} location={location} />;
      });
      return (
        <Route
          exact={exact}
          path={path}
          render={props => {
            if (childs.length && props.location.pathname === path && redirectToChild !== false) {
              const childRedirectUrl = redirectToChild || childs[0].path;
              props.history.push(childRedirectUrl);
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

export default ExtendedRouter;
