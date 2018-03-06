import * as React from "react";
import * as PropTypes from "prop-types";
import {ExpandContext, ExpandContextTypes} from "../ExpandController";

export enum TriggerEvents {
    hover = "onMouseOver",
    click = "onClick",
}

export interface PopupControlProps {
    popupId: string;
    triggerEvent: TriggerEvents,
}

export const PopupControlPropTypes = {
    popupId: PropTypes.string.isRequired,
    triggerEvent: PropTypes.oneOf(Object.values(TriggerEvents)).isRequired,
};

export class PopupControl extends React.Component<PopupControlProps> {
    public static readonly propTypes = PopupControlPropTypes;
    public static readonly contextTypes = ExpandContextTypes;

    public readonly context: ExpandContext;

    public render() {
        return React.cloneElement(this.props.children as React.ReactElement<any>, {
            [this.props.triggerEvent]: this.handleOpen,
        });
    }

    protected handleOpen = () => {
        this.context.changeExpandState(this.props.popupId, true)();
    }
}
