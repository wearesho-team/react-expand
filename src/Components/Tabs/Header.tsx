import * as React from "react";
import * as PropTypes from "prop-types";

import { TabElementProps, TabElementPropTypes, TabElementDefaultProps } from "./TabsProps";

export class Header extends React.Component<TabElementProps> {
    public static readonly propTypes = TabElementPropTypes;
    public static readonly defaultProps = TabElementDefaultProps;

    public render(): JSX.Element {
        return (
            <div
                {...this.props.wrapperProps}
                onClick={this.handleTabActivate}
                data-expand-keep={this.props.tabId}
            >
                {this.props.children}
            </div>
        );
    }

    protected handleTabActivate = (event: React.MouseEvent<HTMLDivElement>): void => {
        this.props.wrapperProps.onClick && this.props.wrapperProps.onClick(event);

        if (!event.defaultPrevented) {
            this.context.changeActiveTab(this.props.tabId);
        }
    }
}
