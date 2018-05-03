import * as React from "react";
import * as PropTypes from "prop-types";

import { ModalPropTypes, ModalProps, ModalDefaultProps } from "./ModalProps";
import { ExpandContextTypes, ExpandContext } from "../ExpandController";
import { ControlledExpandElement } from "../ControlledExpandElement";
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
        this.context.changeExpandState(this.props.expandId, !!this.props.defaultOpened)();
        ModalContainer.modalsList.set(this.props.expandId, !!this.props.defaultOpened);
    }

    public componentWillUnmount() {
        ModalContainer.modalsList.delete(this.props.expandId);
    }

    public componentDidUpdate() {
        ModalContainer.modalsList.set(this.props.expandId, this.context.isExpanded(this.props.expandId));
    }

    public render(): JSX.Element {
        const { activeBodyClassName, defaultOpened, ...childProps } = this.props;

        return (
            <ModalContainer activeBodyClassName={this.props.activeBodyClassName}>
                <ControlledExpandElement
                    {...childProps}
                    style={this.overlayStyle}
                    {...(childProps.closeOnOutside ?
                        { onClick: this.context.changeExpandState(this.props.expandId, false) }
                        : {}
                    )}
                >
                    <div
                        {...(childProps.closeOnOutside ?
                            { onClick: this.stopPropagation }
                            : {}
                        )}
                    >
                        {this.props.children}
                    </div>
                </ControlledExpandElement>
            </ModalContainer>
        );
    }

    protected stopPropagation = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.stopPropagation();
    }
}
