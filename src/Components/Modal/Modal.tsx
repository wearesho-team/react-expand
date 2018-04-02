import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from "prop-types";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";
import { ModalPropTypes, ModalProps, ModalDefaultProps } from "./ModalProps";
import { ModalContainer } from "./ModalContainer";

export class Modal extends React.Component<ModalProps> {
    public static readonly contextTypes = ExpandContextTypes;
    public static readonly defaultProps = ModalDefaultProps;
    public static readonly propTypes = ModalPropTypes;

    public readonly context: ExpandContext;

    private overlayStyle: React.CSSProperties = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "fixed",
        ...this.props.style
    };

    public componentDidMount() {
        this.context.changeExpandState(this.props.modalId, !!this.props.defaultOpened)();
    }

    public render(): JSX.Element {
        return (
            <ModalContainer activeBodyClassName={this.props.activeBodyClassName}>
                {this.context.isExpanded(this.props.modalId) && this.modalWrapper}
            </ModalContainer>
        );
    }

    protected get modalWrapper(): JSX.Element {
        const { activeBodyClassName, modalId, closeOnOutside, defaultOpened, ...childProps } = this.props;
        const dataAttr = `data-expand${!closeOnOutside ? "-keep" : ""}`;

        return (
            <div
                {...childProps}
                style={this.overlayStyle}
                {...{ [dataAttr]: modalId }}
                {...(closeOnOutside ? { onClick: this.context.changeExpandState(modalId, false) } : {})}
            >
                {this.props.children}
            </div>
        );
    }
}
