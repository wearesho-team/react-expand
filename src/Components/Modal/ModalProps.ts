import * as PropTypes from "prop-types";

export interface ModalProps extends React.HTMLProps<HTMLDivElement> {
    closeOnOutside?: boolean;
    defaultOpened?: boolean;
    modalId?: string;
    actionBodyClassName?: string;
}

export const ModalPropTypes: {[P in keyof ModalProps]: PropTypes.Validator<any>} = {
    closeOnOutside: PropTypes.bool,
    defaultOpened: PropTypes.bool,
    modalId: PropTypes.string,
    actionBodyClassName: PropTypes.string,
};

export const ModalDefaultProps: {[P in keyof ModalProps]?: ModalProps[P]} = {
    modalId: `modal-${Date.now().toString() + Math.random().toString()}`,
    actionBodyClassName: "modal-open",
};

export interface ModalContext {
    onClose: () => void;
}

export const ModalContextTypes: {[P in keyof ModalContext]: PropTypes.Validator<any>} = {
    onClose: PropTypes.func.isRequired
};
