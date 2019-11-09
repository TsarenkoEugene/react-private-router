import { useEffect, useRef } from 'react';
import { PropsResolvers } from './types';

export function useResolvers(resolvers: PropsResolvers) {
  const componentProps = useRef({});

  useEffect(() => {
    // console.log('init');

    return () => {
      // console.log('clean');
    };
  });

  async function loadResolvers() {
    const keys = Object.keys(resolvers).map(resolverKey => resolverKey);
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

  return { loadResolvers, getProps };
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
