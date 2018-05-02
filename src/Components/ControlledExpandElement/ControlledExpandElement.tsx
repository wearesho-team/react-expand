import * as React from "react";
import * as PropTypes from "prop-types";

import { Transition } from "../Transition";
import { ExpandContextTypes, ExpandContext } from "../ExpandController";
import {
    ControlledExpandElementProps,
    ControlledExpandElementPropTypes,
    ControlledExpandElementDefaultProps
} from "./ControlledExpandElementProps";

export class ControlledExpandElement extends React.Component<ControlledExpandElementProps> {
    public static readonly defaultProps = ControlledExpandElementDefaultProps;
    public static readonly propTypes = ControlledExpandElementPropTypes;
    public static readonly contextTypes = ExpandContextTypes;

    public readonly context: ExpandContext;

    public render(): React.ReactNode {
        const { expandId, closeOnOutside, animationTimeout, ...childProps } = this.props;
        const dataAttr = `data-expand${!closeOnOutside ? "-keep" : ""}`;

        return (
            <Transition
                status={this.context.isExpanded(expandId)}
                timeout={animationTimeout}
                {...{ [dataAttr]: expandId }}
                {...childProps}
            >
                {this.props.children}
            </Transition>
        );
    }
}
