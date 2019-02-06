import * as React from "react";

import { ControlledExpandElementProps, ControlledExpandElement } from "..";
import { TabsContext, TabsContextValue } from "./TabsContext";

export class Tab extends React.Component<ControlledExpandElementProps> {
    public static readonly contextType = TabsContext;

    public readonly context: TabsContextValue;

    public componentDidMount() {
        this.context.registerTab(this.props.expandId);
    }

    public componentWillUnmount() {
        this.context.unregisterTab(this.props.expandId);
    }

    public render(): JSX.Element {
        return (
            <ControlledExpandElement {...this.props}>
                {this.props.children}
            </ControlledExpandElement>
        );
    }
}
