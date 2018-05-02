import * as React from "react";
import * as PropTypes from "prop-types";

import {
    ControlledExpandElementDefaultProps,
    ControlledExpandElementPropTypes,
    ControlledExpandElementProps,
    ControlledExpandElement,
} from "../ControlledExpandElement";
import { TabsContext, TabsContextTypes } from "./TabsControllerContext";

export class Tab extends React.Component<ControlledExpandElementProps> {
    public static readonly contextTypes = TabsContextTypes;
    public static readonly propTypes = ControlledExpandElementPropTypes;
    public static readonly defaultProps = ControlledExpandElementDefaultProps;

    public readonly context: TabsContext;

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
