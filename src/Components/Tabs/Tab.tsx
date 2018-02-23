import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";
import {
    TabsContext,
    TabElementProps,
    TabsContextTypes,
    TabElementPropTypes,
    TabElementDefaultProps
} from "./TabsProps";

export class Tab extends React.Component<TabElementProps> {
    public static readonly contextTypes = {
        ...ExpandContextTypes,
        ...TabsContextTypes
    };
    public static readonly propTypes = TabElementPropTypes;
    public static readonly defaultProps = TabElementDefaultProps;

    public readonly context: ExpandContext & TabsContext;

    public componentDidMount() {
        this.context.registerTab(this.props.tabId);
    }

    public componentWillUnmount() {
        this.context.unregisterTab(this.props.tabId);
    }

    public render(): JSX.Element {
        const { tabId, activeClassName, ...childProps } = this.props;

        return (
            <div
                {...childProps}
                data-expand-keep={tabId}
                className={this.className}
            >
                {this.context.isExpanded(tabId) && this.props.children}
            </div>
        );
    }

    protected get className(): string {
        const { className, activeClassName, tabId } = this.props;
        return `${(className || "")}${this.context.isExpanded(tabId) ? ` ${this.props.activeClassName}` : ""}`
    }
}
