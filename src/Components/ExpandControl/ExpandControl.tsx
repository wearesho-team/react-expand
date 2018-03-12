import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContext, ExpandContextTypes } from "../ExpandController";
import {
    TriggerEvents,
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
        const { state, expandId, triggerEvent } = this.props;
        const newState = state !== undefined ? state : !this.context.isExpanded(expandId);

        return React.cloneElement(this.props.children as React.ReactElement<any>, {
            [triggerEvent]: this.context.changeExpandState(expandId, newState),
        });
    }
}
