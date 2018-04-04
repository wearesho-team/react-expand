import * as React from "react";
import * as PropTypes from "prop-types";

import {
    ExpandControl,
    ExpandControlProps,
    ExpandControlPropTypes,
    ExpandControlDefaultProps
} from "../ExpandControl";
import { TabsContext, TabsContextTypes } from "./TabsControllerContext";

export class Header extends React.Component<ExpandControlProps> {
    public static readonly contextTypes = TabsContextTypes;
    public static readonly propTypes = ExpandControlPropTypes;
    public static readonly defaultProps = ExpandControlDefaultProps;

    public readonly context: TabsContext;

    public render(): JSX.Element {
        return (
            <ExpandControl
                {...this.props}
                onClick={this.handleTabActivate}
                triggerEvent="click"
                staticState
            >
                {this.props.children}
            </ExpandControl>
        );
    }

    protected handleTabActivate = (event: React.MouseEvent<HTMLButtonElement>): void => {
        this.props.onClick && this.props.onClick(event);

        event.preventDefault();
        this.context.changeActiveTab(this.props.expandId);
    }
}
