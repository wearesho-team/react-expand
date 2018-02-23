import * as React from "react";
import * as PropTypes from "prop-types";

import {
    TabsContext,
    TabElementProps,
    TabsContextTypes,
    TabElementPropTypes,
    TabElementDefaultProps
} from "./TabsProps";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";

export class Header extends React.Component<TabElementProps> {
    public static readonly contextTypes = {
        ...ExpandContextTypes,
        ...TabsContextTypes
    };
    public static readonly propTypes = TabElementPropTypes;
    public static readonly defaultProps = TabElementDefaultProps;

    public readonly context: ExpandContext & TabsContext;

    public render(): JSX.Element {
        const { tabId, activeClassName, ...childProps } = this.props;

        return (
            <div
                {...childProps}
                onClick={this.handleTabActivate}
                className={this.className}
                data-expand-keep={tabId}
            >
                {this.props.children}
            </div>
        );
    }

    protected handleTabActivate = (event: React.MouseEvent<HTMLDivElement>): void => {
        this.props.onClick && this.props.onClick(event);

        if (!event.defaultPrevented) {
            this.context.changeActiveTab(this.props.tabId);
        }
    }

    protected get className(): string {
        const { className, activeClassName, tabId } = this.props;
        return `${(className || "")}${this.context.isExpanded(tabId) ? ` ${this.props.activeClassName}` : ""}`
    }
}
