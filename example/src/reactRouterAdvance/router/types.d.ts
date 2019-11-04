export interface OwnProps {
    path: string;
    component: any;
    redirectUrl?: string;
    guards?: any[];
    resolvers?: any[];
    debounceWaitTime?: number;
    childs?: any[];
    redirectToChild?: string | null;
    exact?: boolean;
    location?: any;
}
export declare type IProps = OwnProps;
