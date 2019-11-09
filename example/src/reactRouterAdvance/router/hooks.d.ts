import { PropsResolvers } from './types';
export declare function useResolvers(resolvers: PropsResolvers): {
    loadResolvers: () => Promise<void>;
    getProps: () => {};
};
export declare function useTimer(): {
    startTimer: (debounceWaitTime: number, cb: () => any) => void;
    clearTimer: () => void;
};
