import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContext, ExpandContextTypes } from "../ExpandController";
import { PopupProps, PopupPropTypes } from "./PopupProps";

export class Popup extends React.Component<PopupProps> {
    public static readonly propTypes = PopupPropTypes;
    public static readonly contextTypes = ExpandContextTypes;

    public readonly context: ExpandContext;

    public render() {
        const { popupId, ...childProps } = this.props;

        if (!this.context.isExpanded(popupId)) {
            return null;
        }

        return (
            <div {...childProps} onMouseOut={this.context.changeExpandState(this.props.popupId, false)}>
                {this.props.children}
            </div>
        );
    }
}
