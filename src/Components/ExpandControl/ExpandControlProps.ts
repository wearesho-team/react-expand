import * as PropTypes from "prop-types";

export enum TriggerEvents {
    hover = "onMouseOver",
    click = "onClick",
    out = "onMouseOut",
    leave = "onMouseLeave",
}

export interface ExpandControlProps {
    expandId: string;
    triggerEvent?: TriggerEvents,
    state?: boolean;
}

export const ExpandControlPropTypes: {[T in keyof ExpandControlProps]: PropTypes.Validator<any>} = {
    expandId: PropTypes.string.isRequired,
    triggerEvent: PropTypes.oneOf(Object.values(TriggerEvents)),
    state: PropTypes.bool,
};

export const ExpandControlDefaultProps: {[T in keyof ExpandControlProps]?: ExpandControlProps[T]} = {
    triggerEvent: TriggerEvents.click,
};
