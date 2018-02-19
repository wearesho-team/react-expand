import * as React from "react";
import * as PropTypes from "prop-types";

import { ModalContextTypes, ModalContext } from "./ModalProps";

export class ModalCloseButton extends React.Component<React.HTMLProps<HTMLButtonElement>> {
    public static readonly contextTypes = ModalContextTypes;

    public readonly context: ModalContext;

    public render(): JSX.Element {
        return (
            <button
                {...this.props}
                onClick={this.handleClose}
                type="button"
            >
                {this.props.children}
            </button>
        );
    }

    protected handleClose = (event: React.MouseEvent<HTMLButtonElement>): void => {
        this.props.onClick && this.props.onClick(event);
        if (!event.defaultPrevented) {
            this.context.onClose();
        }
    }
}
