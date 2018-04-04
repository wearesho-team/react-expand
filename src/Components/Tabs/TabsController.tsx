import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";
import { TabsContext, TabsContextTypes } from "./TabsControllerContext";

export interface TabsControllerState {
    tabs: Set<string>;
    activeTab?: string;
}

export interface TabsControllerProps {
    defaultOpened?: string;
}

export const TabsControllerPropTypes: {[P in keyof TabsControllerProps]: PropTypes.Validator<any>} = {
    defaultOpened: PropTypes.string
};

export class TabsController extends React.Component<TabsControllerProps, TabsControllerState> {
    public static readonly childContextTypes = TabsContextTypes;
    public static readonly propTypes = TabsControllerPropTypes;
    public static readonly contextTypes = ExpandContextTypes;

    public readonly context: ExpandContext;
    public readonly state: TabsControllerState = {
        tabs: new Set()
    };

    public getChildContext(): TabsContext {
        return {
            changeActiveTab: this.changeActiveTab,
            unregisterTab: this.unregisterTab,
            activeTab: this.state.activeTab,
            registerTab: this.registerTab
        }
    }

    public render() {
        return this.props.children;
    }

    protected changeActiveTab = (activeTab: string): void => {
        this.state.tabs.forEach((tabId) => tabId !== activeTab && this.context.changeExpandState(tabId, false)());

        this.setState({ activeTab });
        this.context.changeExpandState(activeTab, true)();
    };

    protected unregisterTab = (id: string) => this.state.tabs.delete(id);

    protected registerTab = (id: string) => {
        this.state.tabs.add(id);

        this.changeActiveTab(
            this.props.defaultOpened && this.state.tabs.has(this.props.defaultOpened)
                ? this.props.defaultOpened
                : id
        );
    };
}
