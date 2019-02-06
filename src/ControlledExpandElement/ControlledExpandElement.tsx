import * as React from "react";

import { ExpandContext, ExpandContextValue } from "../ExpandController";
import { ControlledExpandElementProps } from "./ControlledExpandElementProps";

export class ControlledExpandElement extends React.Component<ControlledExpandElementProps> {
    public static readonly contextType = ExpandContext;

    public readonly context: ExpandContextValue;

    public render(): React.ReactNode {
        const { expandId, closeOnOutside, ...childProps } = this.props;
        const dataAttr = `data-expand${!closeOnOutside ? "-keep" : ""}`;

        return this.context.isExpanded(expandId) && (
            <div {...childProps} {...{ [dataAttr]: expandId }}>
                {this.props.children}
            </div>
        );
    }
}
