import { RouteComponentProps } from 'react-router-dom';

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

// export type IProps = OwnProps;
