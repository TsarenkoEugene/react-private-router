import { ElementType, ReactChild, ReactFragment, ReactPortal } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export type RouterPath = string | string[] | undefined;

type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean;

export interface ExtendedRouterProps {
  path: RouterPath;
  component: ElementType;
  redirectUrl?: string;
  guards?: Guard[];
  resolvers?: Resolver[];
  debounceWaitTime?: number;
  childs?: ExtendedRouterProps[];
  redirectToChild?: string | boolean;
  exact?: boolean;
  location?: any;
}

export enum ExtentedRouterStatus {
  INITIAL,
  LOADING,
  SUCCESS,
  FAIL,
}

export interface Guard {
  CanActivate(): Promise<boolean> | boolean;
}
export interface Resolver {
  Resolve(): Promise<void> | void;
}

export type Props = RouteComponentProps & ExtendedRouterProps;
