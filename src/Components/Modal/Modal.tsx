import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from "prop-types";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";
import { ModalPropTypes, ModalProps, ModalDefaultProps } from "./ModalProps";

export class Modal extends React.Component<ModalProps> {
    public static readonly contextTypes = ExpandContextTypes;
    public static readonly defaultProps = ModalDefaultProps;
    public static readonly propTypes = ModalPropTypes;

    public static readonly containerName = "modal-container";

    public readonly context: ExpandContext;

    private container: HTMLDivElement;

    private overlayStyle: React.CSSProperties = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "fixed",
        ...this.props.style
    };

    constructor(props) {
        super(props);

        this.container = document.createElement("div");
        this.container.id = Modal.containerName;
    }

    public componentDidMount() {
        this.context.changeExpandState(this.props.modalId, !!this.props.defaultOpened)();

        const existContainer = document.getElementById(Modal.containerName) as HTMLDivElement;
        if (!existContainer) {
            document.body.appendChild(this.container);
        } else {
            this.container = existContainer;
        }

        this.setBodyClassName();
    }

    public componentWillUnmount() {
        this.container && document.body.removeChild(this.container);
    }

    public componentDidUpdate() {
        this.setBodyClassName();
    }

    public render(): JSX.Element {
        const { activeBodyClassName, modalId, closeOnOutside, defaultOpened, ...childProps } = this.props;
        const dataAttr = `data-expand${!closeOnOutside ? "-keep" : ""}`;

        return ReactDOM.createPortal(
            this.context.isExpanded(modalId) && (
                <div
                    {...childProps}
                    style={this.overlayStyle}
                    {...{ [dataAttr]: modalId }}
                    {...(closeOnOutside ? { onClick: this.context.changeExpandState(modalId, false) } : {})}
                >
                    {this.props.children}
                </div>
            ),
            this.container
        );
    }

    protected setBodyClassName = () => {
        if (document.body.classList.contains(this.props.activeBodyClassName) && !this.container.childElementCount) {
            document.body.classList.remove(this.props.activeBodyClassName);
        }

        if (!document.body.classList.contains(this.props.activeBodyClassName) && this.container.childElementCount) {
            document.body.classList.add(this.props.activeBodyClassName);
        }
    }
}
