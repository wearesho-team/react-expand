import * as React from "react";
import * as PropTypes from "prop-types";

import {
    TabsContext,
    TabElementProps,
    TabsContextTypes,
    TabElementPropTypes
} from "./TabsProps";

export class Header extends React.Component<TabElementProps> {
    public static readonly contextTypes = TabsContextTypes;
    public static readonly propTypes = TabElementPropTypes;

    public readonly context: TabsContext;

    public render(): JSX.Element {
        const { tabId, ...childProps } = this.props;

        return (
            <div
                {...childProps}
                onClick={this.handleTabActivate}
                data-expand-keep={tabId}
                className="header"
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
}
