import * as React from "react";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";
import { TabsContext, TabsContextTypes } from "./TabsProps";

export interface TabsControllerState {
    tabs: Set<string>;
}

export class TabsController extends React.Component<{}, TabsControllerState> {
    public static readonly childContextTypes = TabsContextTypes;
    public static readonly contextTypes = ExpandContextTypes;

    public readonly context: ExpandContext;

    constructor(props) {
        super(props);

        this.state = {
            tabs: new Set()
        };
    }

    public getChildContextTypes(): TabsContext {
        return {
            changeActiveTab: this.changeActiveTab,
            unregisterTab: this.unregisterTab,
            registerTab: this.registerTab
        }
    }

    public render() {
        return this.props.children;
    }

    protected changeActiveTab = (id: string): void => {
        this.state.tabs.forEach((tabId) => (
            this.context.isExpanded(tabId) && this.context.changeExpandState(tabId, false)()
        ));

        this.context.changeExpandState(id, true)();
    };

    protected unregisterTab = (id: string) => this.state.tabs.delete(id);

    protected registerTab = (id: string) => this.state.tabs.add(id);
}