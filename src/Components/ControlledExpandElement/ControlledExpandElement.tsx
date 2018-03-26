import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";
import {
    ControlledExpandElementProps,
    ControlledExpandElementPropTypes,
} from "./ControlledExpandElementProps";

export class ControlledExpandElement extends React.Component<ControlledExpandElementProps> {
    public static readonly propTypes = ControlledExpandElementPropTypes;
    public static readonly contextTypes = ExpandContextTypes;

    public readonly context: ExpandContext;

    public render(): React.ReactNode {
        const { expandId, closeOnOutside, ...childProps } = this.props;
        const dataAttr = `data-expand${!closeOnOutside ? "-keep" : ""}`;

        return this.context.isExpanded(expandId) && (
            <div
                {...childProps}
                {...{ [dataAttr]: expandId }}
            >
                {this.props.children}
            </div>
        );
    }
}
