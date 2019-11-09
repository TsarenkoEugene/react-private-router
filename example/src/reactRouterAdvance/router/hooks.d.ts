import { PropsResolvers } from './types';
export declare function useResolvers(resolvers: PropsResolvers): {
    loadResolvers: () => Promise<void>;
    getProps: () => {};
};
