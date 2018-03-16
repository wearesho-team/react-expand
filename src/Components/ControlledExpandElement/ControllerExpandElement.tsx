import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";
import { ControlledExpandElementProps, ControlledExpandElementPropTypes } from "./ControllerExpandElementProps";

export class ControlledExpandElement extends React.Component<ControlledExpandElementProps> {
    public static readonly propTypes = ControlledExpandElementPropTypes;
    public static readonly contextTypes = ExpandContextTypes;

    public readonly context: ExpandContext;

    public render(): React.ReactNode {
        const { expandId, activeClassName, ...childProps } = this.props;

        return (
            <div
                {...childProps}
                data-expand-keep={expandId}
                className={this.className}
            >
                {this.context.isExpanded(expandId) && this.props.children}
            </div>
        );
    }

    private get className(): string {
        const { className, activeClassName, expandId } = this.props;
        return `${(className || "")}${this.context.isExpanded(expandId) ? ` ${activeClassName}` : ""}`.trim();
    }
}
