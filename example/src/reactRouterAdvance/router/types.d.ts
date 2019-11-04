import { ElementType } from 'react';
import { RouteComponentProps } from 'react-router-dom';
export declare type RouterPath = string | string[] | undefined;
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
export declare enum ExtentedRouterStatus {
    INITIAL = 0,
    LOADING = 1,
    SUCCESS = 2,
    FAIL = 3
}
export interface Guard {
    CanActivate(): Promise<boolean> | boolean;
}
export interface Resolver {
    Resolve(): Promise<void> | void;
}
export declare type Props = RouteComponentProps & ExtendedRouterProps;
