import * as React from "react";

export interface ExpandContextValue<TState = any> {
    changeExpandState: (key: string, open?: boolean, state?: TState) => () => void;
    isExpanded: (key: string) => boolean;
    getState: (key: string) => TState;
}

export const ExpandContext = React.createContext<ExpandContextValue>({
    changeExpandState: () => () => undefined,
    isExpanded: () => false,
    getState: () => undefined,
});
