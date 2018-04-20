import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from "prop-types";

import { ModalPropTypes, ModalProps, ModalDefaultProps } from "./ModalProps";
import { OuterContextProvider, StaticContainer } from "../StaticContainer";
import { ExpandContextTypes, ExpandContext } from "../ExpandController";
import { ModalContainer } from "./ModalContainer";

import { isBrowserExist } from "../helpers/isBrowerExist";

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
        if (!isBrowserExist()) {
            // on ssr mode lifecycles does not triggered
            // so `render` call only ones
            return !!this.props.defaultOpened && (
                <StaticContainer>
                    <OuterContextProvider context={this.context}>
                        {this.modalWrapper}
                    </OuterContextProvider>
                </StaticContainer>
            );
        }

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
