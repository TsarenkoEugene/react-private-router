export interface OwnProps {
    path: string;
    component: any;
    redirectUrl?: string;
    guards?: any[];
    resolvers?: any[];
    debounceWaitTime?: number;
    childs?: any[];
    redirectToChild?: string | boolean;
    exact?: boolean;
    location?: any;
}
