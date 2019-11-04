/// <reference types="react" />
import { ExtendedRouterProps, InitializeRouter } from './types';
declare const initializeRouter: ({ loading }?: InitializeRouter) => {
    ExtendedRouter: ({ path, component, redirectUrl, guards, resolvers, debounceWaitTime, childs, redirectToChild, exact, location, }: ExtendedRouterProps) => JSX.Element | null;
};
export default initializeRouter;
