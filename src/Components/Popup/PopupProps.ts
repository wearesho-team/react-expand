import * as React from "react";
import * as PropTypes from "prop-types";
import {TriggerEvents} from "../ExpandControl";

export interface PopupProps extends React.HTMLProps<HTMLDivElement> {
    popupId: string;
    triggerEvent?: TriggerEvents;
}

export const PopupPropTypes: {[T in keyof PopupProps]: PropTypes.Validator<any>} = {
    popupId: PropTypes.string.isRequired,
    triggerEvent: PropTypes.oneOf(Object.values(TriggerEvents)),
};

export const PopupDefaultProps: {[T in keyof PopupProps]?: PopupProps[T]} = {
    triggerEvent: TriggerEvents.leave,
};
