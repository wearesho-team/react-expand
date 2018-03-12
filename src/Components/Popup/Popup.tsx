import * as React from "react";
import * as PropTypes from "prop-types";

import { TriggerEvents } from "../ExpandControl";
import { ExpandContext, ExpandContextTypes } from "../ExpandController";
import { PopupDefaultProps, PopupProps, PopupPropTypes } from "./PopupProps";

export class Popup extends React.Component<PopupProps> {
    public static readonly propTypes = PopupPropTypes;
    public static readonly contextTypes = ExpandContextTypes;
    public static readonly defaultProps = PopupDefaultProps;

    public readonly context: ExpandContext;

    public render() {
        const { popupId, triggerEvent, ...childProps } = this.props;

        if (!this.context.isExpanded(popupId)) {
            return null;
        }

        Object.assign(childProps, {
            [triggerEvent]: this.context.changeExpandState(popupId, false)
        });

        return (
            <div {...childProps}>
                {this.props.children}
            </div>
        );
    }
}
