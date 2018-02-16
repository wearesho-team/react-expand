import * as PropTypes from "prop-types";

export interface ModalProps {
    wrapperProps?: React.HTMLProps<HTMLDivElement>;
    closeOnOutside?: boolean;
    defaultOpened?: boolean;
    modalId?: string;
}

export const ModalPropTypes: {[P in keyof ModalProps]: PropTypes.Validator<any>} = {
    wrapperProps: PropTypes.object,
    closeOnOutside: PropTypes.bool,
    defaultOpened: PropTypes.bool
};

export const ModalDefaultProps: {[P in keyof ModalProps]?: ModalProps[P]} = {
    wrapperProps: {
        className: "modal-overlay"
    },
    modalId: `modal-${Date.now().toString() + Math.random().toString()}`
};

export interface ModalContext {
    onClose: () => void;
}

export const ModalContextTypes: {[P in keyof ModalContext]: PropTypes.Validator<any>} = {
    onClose: PropTypes.func.isRequired
};
