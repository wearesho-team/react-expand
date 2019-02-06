import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContext, ExpandContextValue } from "../ExpandController";
import { TabsContext, TabsContextValue } from "./TabsContext";

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
    public static readonly propTypes = TabsControllerPropTypes;
    public static readonly contextType = ExpandContext;

    public readonly context: ExpandContextValue;
    public readonly state: TabsControllerState = { tabs: new Set() };

    protected get childContextValue(): TabsContextValue {
        return {
            changeActiveTab: this.changeActiveTab,
            unregisterTab: this.unregisterTab,
            activeTab: this.state.activeTab,
            registerTab: this.registerTab
        }
    }

    public componentDidUpdate() {
        this.state.tabs.forEach((id) => {
            if (this.context.isExpanded(id) && this.state.activeTab !== id) {
                return this.changeActiveTab(id);
            }
        });
    }

    public render() {
        return <TabsContext.Provider value={this.childContextValue} children={this.props.children} />;
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
