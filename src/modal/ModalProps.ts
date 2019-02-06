import * as PropTypes from "prop-types";

export interface ModalProps extends React.HTMLProps<HTMLDivElement> {
    activeBodyClassName?: string;
    closeOnOutside?: boolean;
    defaultOpened?: boolean;
    modalId: string;
}

export const ModalPropTypes: {[P in keyof ModalProps]: PropTypes.Validator<any>} = {
    activeBodyClassName: PropTypes.string,
    modalId: PropTypes.string.isRequired,
    closeOnOutside: PropTypes.bool,
    defaultOpened: PropTypes.bool
};

export const ModalDefaultProps: {[P in keyof ModalProps]?: ModalProps[P]} = {
    activeBodyClassName: "modal-open"
};
