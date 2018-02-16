import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from "prop-types";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";
import { ModalProps, ModalPropTypes, ModalContext, ModalContextTypes, ModalDefaultProps } from "./ModalProps";

export class Modal extends React.Component<ModalProps> {
    public static readonly childContextTypes = ModalContextTypes;
    public static readonly contextTypes = ExpandContextTypes;
    public static readonly defaultProps = ModalDefaultProps;
    public static readonly propTypes = ModalPropTypes;

    public static readonly containerName = "modal-container";

    public readonly context: ExpandContext;

    public getChildContextTypes(): ModalContext {
        return {
            onClose: this.context.changeExpandState(this.id)
        };
    }

    constructor(props) {
        super(props);

        this.container = document.createElement("div");
        this.container.id = Modal.containerName;
    }

    private container: HTMLDivElement;
    private id = `modal-${Date.now().toString() + Math.random().toString()}`;

    public componentDidMount() {
        this.context.changeExpandState(this.id, this.props.defaultOpened)();

        if (!document.getElementById(Modal.containerName)) {
            document.appendChild(this.container);
        }
    }

    public componentWillUnmount() {
        document.removeChild(this.container);
    }

    public componentDidUpdate() {
        if (document.body.classList.contains("modal-open") && !this.context.isExpanded(this.id)) {
            document.body.classList.remove("modal-open");
        }

        if (!document.body.classList.contains("modal-open") && this.context.isExpanded(this.id)) {
            document.body.classList.add("modal-open");
        }
    }

    public render(): JSX.Element {
        const dataAttr = `data-expand-${!this.props.closeOnOutside ? "keep" : ""}`;

        return ReactDOM.createPortal(
            this.context.isExpanded(this.id) && (
                <div
                    {...this.props.wrapperProps}
                    {...{ [dataAttr]: this.id }}
                    data-expand-keep={this.props.closeOnOutside}
                >
                    {this.props.children}
                </div>
            ),
            this.container
        );
    }
}
