import { ElementType } from 'react';
import { RouteComponentProps } from 'react-router-dom';
export declare type RouterPath = string | string[] | undefined;
export interface ExtendedRouterProps {
    path: RouterPath;
    component: ElementType;
    redirectUrl?: string;
    guards?: Guard[];
    resolvers?: PropsResolvers;
    childs?: ExtendedRouterProps[];
    redirectToChild?: string | boolean;
    exact?: boolean;
    location?: any;
}
export declare enum ExtentedRouterStatus {
    INITIAL = 0,
    SUCCESS = 1,
    FAIL = 2
}
export interface PropsResolvers {
    [index: string]: Resolver;
}
export interface Guard {
    CanActivate(): Promise<boolean> | boolean;
}
export interface Resolver {
    Resolve(): Promise<void> | void;
}
export declare type Props = RouteComponentProps & ExtendedRouterProps;
export interface ParentComponentWithChildRoutes {
    childRoutes: JSX.Element[];
}
