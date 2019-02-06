import * as React from "react";

import {
    ExpandControl,
    ExpandControlProps,
    ExpandControlDefaultProps
} from "../ExpandControl";
import { TabsContext, TabsContextValue } from "./TabsContext";

export class Header extends React.Component<ExpandControlProps> {
    public static readonly contextType = TabsContext;
    public static readonly defaultProps = ExpandControlDefaultProps;

    public readonly context: TabsContextValue;

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
