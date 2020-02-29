import { useEffect, useRef } from 'react';
import { PropsResolvers, ExtendedRouterProps, RouterPath, Guard, ExtentedRouterStatus } from './types';
import { getAllMathedResolvers, setKey } from './helpers';

interface UserManager {
  resolvers: PropsResolvers;
  guards: Guard[];
}

interface LoadingManager {
  childs: ExtendedRouterProps[];
  currentPath: string;
  path: RouterPath;
}

export function useLoadingManager() {
  const queue: { [key: string]: any } = {};
  let isLoadingActive = false;

  function setPath({ currentPath, path, childs }: LoadingManager) {
    const stringPath = setKey(path);
    if (queue[stringPath] && queue[stringPath] !== null) {
      return;
    }
    queue[stringPath] = null; // Set loading null to avoid immediately loading

    // But if path has a childs with resolvers we need to set premature loading
    const resolvers = getAllMathedResolvers(currentPath, childs);
    // console.log(resolvers);
    Object.keys(resolvers).forEach(resolverPath => {
      if (Object.keys(resolvers[resolverPath]).length) {
        queue[setKey(resolverPath)] = true;
      }
    });
  }

  function pathIsLoading(path: RouterPath) {
    queue[setKey(path)] = true;
  }
  function setParentLoadingActive() {
    isLoadingActive = true;
  }
  function isParentLoadingActive() {
    return isLoadingActive;
  }

  function isLoading() {
    return Object.keys(queue).some(resKey => queue[resKey] === true);
  }

  function loadingDone(path: RouterPath) {
    queue[setKey(path)] = false;
    console.log(queue);
    console.log(isLoading());
  }

  // function setQueue(currentPath)

  return {
    setPath,
    loadingDone,
    isLoading,
    pathIsLoading,
    setParentLoadingActive,
    isParentLoadingActive,
  };
}
export function useManager({ resolvers, guards }: UserManager) {
  // childs: ExtendedRouterProps[],
  const componentProps = useRef({});
  const allResolvers = useRef(resolvers);
  const allGuards = useRef(guards);

  // const childResolvers = getAllMathedResolvers(currentPath, childs);
  // allResolvers.current = {
  //   [setKey(componentPath)]: resolvers,
  //   ...childResolvers,
  // };
  // console.log('init', childResolvers);

  // console.log(parentComponentPath, childs);
  // console.log(componentPath, currentPath);

  // console.log(childResolvers);

  useEffect(() => {
    return () => {
      // console.log('clean');
    };
  });

  async function checkGuards(): Promise<ExtentedRouterStatus> {
    // return ExtentedRouterStatus.SUCCESS;
    console.log('guard');
    const result = [];
    for (const guard of allGuards.current) {
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
  }

  async function loadResolvers() {
    console.log('load');
    const keys = Object.keys(allResolvers.current).map(resolverKey => resolverKey);
    const promises = Object.keys(resolvers).map(resolverKey => resolvers[resolverKey].Resolve());
    const resultOfResolvers = await Promise.all(promises).catch(e => {
      console.error('Error in resolvers');
      console.error(e);
    });
    componentProps.current = (resultOfResolvers as []).reduce((acc, next, index) => {
      const key = keys[index];
      return { ...acc, [key]: next };
    }, {});
  }

  function getProps() {
    return componentProps.current;
  }

  return { loadResolvers, getProps, checkGuards };
}

export function useTimer() {
  const savedTimer = useRef(0);
  const savedTime = useRef(Date.now());

  function startTimer(debounceWaitTime: number, cb: () => any) {
    savedTimer.current = setInterval(() => {
      if (savedTime.current + debounceWaitTime < Date.now()) {
        cb();
      }
    }, 30);
  }
  function clearTimer() {
    clearInterval(savedTimer.current);
  }

  return { startTimer, clearTimer };
}

export function usePathCollector() {
  const paths: { isParent: boolean; path: string; time: number }[] = [];

  function addPath(path: string) {
    const pathObject = {
      path,
      time: +new Date(),
    };
    if (paths.length === 0) {
      paths.push({ isParent: true, ...pathObject });
    } else {
      paths.push({ isParent: false, ...pathObject });
    }

    console.log(paths);
  }
  function pathHasParent(): boolean {
    if (paths.length === 0) {
      return false;
    }
    const hasChild = paths.find(path => path.isParent);

    return typeof hasChild !== 'undefined';
  }
  function getLoadingTime(path: string): number {
    const parent = paths.find(pt => pt.isParent && path.startsWith(pt.path));
    if (!parent) {
      return 0;
    }
    return +new Date() - parent.time;
  }

  return { addPath, pathHasParent, getLoadingTime };
}
