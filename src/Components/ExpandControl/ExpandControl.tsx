import * as React from "react";
import { ExpandContext, ExpandContextTypes } from "../ExpandController";
import {
    ExpandControlDefaultProps,
    ExpandControlProps,
    ExpandControlPropTypes
} from "./ExpandControlProps";

export class ExpandControl extends React.Component<ExpandControlProps> {
    public static readonly propTypes = ExpandControlPropTypes;
    public static readonly contextTypes = ExpandContextTypes;
    public static readonly defaultProps = ExpandControlDefaultProps;

    public readonly context: ExpandContext;

    public render() {
        return React.cloneElement(this.props.children as React.ReactElement<any>, {
            [this.props.triggerEvent]: this.context.changeExpandState(this.props.expandId, true),
        });
    }
}
