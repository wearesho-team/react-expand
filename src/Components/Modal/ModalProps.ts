import * as PropTypes from "prop-types";

import {
    ControlledExpandElementProps,
    ControlledExpandElementPropTypes,
    ControlledExpandElementDefaultProps
} from "../ControlledExpandElement";

export interface ModalProps extends ControlledExpandElementProps {
    activeBodyClassName?: string;
    defaultOpened?: boolean;
    ref?: any;
}

export const ModalPropTypes: {[P in keyof ModalProps]: PropTypes.Validator<any>} = {
    activeBodyClassName: PropTypes.string,
    defaultOpened: PropTypes.bool,
    ...ControlledExpandElementPropTypes
};

export const ModalDefaultProps: {[P in keyof ModalProps]?: ModalProps[P]} = {
    activeBodyClassName: "modal-open",
    ...ControlledExpandElementDefaultProps
};
