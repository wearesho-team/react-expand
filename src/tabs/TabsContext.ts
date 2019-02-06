import * as React from "react";

export interface TabsContextValue {
    changeActiveTab: (id: string) => void;
    unregisterTab: (id: string) => void;
    registerTab: (id: string) => void;
    activeTab?: string;
}

export const TabsContext = React.createContext<TabsContextValue>({
    registerTab: () => undefined,
    unregisterTab: () => undefined,
    changeActiveTab: () => undefined,
});
