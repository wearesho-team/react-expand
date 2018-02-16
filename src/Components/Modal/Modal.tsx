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

    private container: HTMLDivElement;

    constructor(props) {
        super(props);

        this.container = document.createElement("div");
        this.container.id = Modal.containerName;
    }

    public getChildContext(): ModalContext {
        return {
            onClose: this.context.changeExpandState(this.props.modalId)
        };
    }

    public componentDidMount() {
        this.context.changeExpandState(this.props.modalId, !!this.props.defaultOpened)();

        if (!document.getElementById(Modal.containerName)) {
            document.body.appendChild(this.container);
        }

        this.setBodyClassName();
    }

    public componentWillUnmount() {
        document.body.removeChild(this.container);
    }

    public componentDidUpdate() {
        this.setBodyClassName();
    }

    public render(): JSX.Element {
        const dataAttr = `data-expand${!this.props.closeOnOutside ? "-keep" : ""}`;

        return ReactDOM.createPortal(
            this.context.isExpanded(this.props.modalId) && (
                <div
                    {...this.props.wrapperProps}
                    {...{ [dataAttr]: this.props.modalId }}
                >
                    {this.props.children}
                </div>
            ),
            this.container
        );
    }

    protected setBodyClassName = () => {
        if (document.body.classList.contains("modal-open") && !this.context.isExpanded(this.props.modalId)) {
            document.body.classList.remove("modal-open");
        }

        if (!document.body.classList.contains("modal-open") && this.context.isExpanded(this.props.modalId)) {
            document.body.classList.add("modal-open");
        }
    }
}
