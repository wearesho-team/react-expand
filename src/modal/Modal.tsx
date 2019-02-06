import * as React from "react";

import { ModalPropTypes, ModalProps, ModalDefaultProps } from "./ModalProps";
import { ExpandContext, ExpandContextValue } from "..";

// todo: get a solution for SSR
export class Modal extends React.Component<ModalProps> {
    public static readonly contextType = ExpandContext;
    public static readonly defaultProps = ModalDefaultProps;
    public static readonly propTypes = ModalPropTypes;

    public readonly context: ExpandContextValue;

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
        // on ssr mode lifecycles does not triggered
        // so `render` call only ones
        return !!this.props.defaultOpened && this.modalWrapper;
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
