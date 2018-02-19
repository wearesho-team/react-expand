import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";

export interface ModalOpenButtonProps extends React.HTMLProps<HTMLButtonElement> {
    modalId: string;
}

export const ModalOpenButtonPropTypes: {[P in keyof ModalOpenButtonProps]: PropTypes.Validator<any>} = {
    modalId: PropTypes.string.isRequired
};

export class ModalOpenButton extends React.Component<ModalOpenButtonProps> {
    public static readonly propTypes = ModalOpenButtonPropTypes;
    public static readonly contextTypes = ExpandContextTypes;

    public readonly context: ExpandContext;

    public render(): JSX.Element {
        const { modalId, ...childProps } = this.props;

        return (
            <button
                {...childProps}
                type="button"
                onClick={this.handleOpen}
                data-expand={modalId}
            >
                {this.props.children}
            </button>
        );
    }

    protected handleOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
        this.props.onClick && this.props.onClick(event);
        if (!event.defaultPrevented) {
            this.context.changeExpandState(this.props.modalId, true)();
        }
    }
}
