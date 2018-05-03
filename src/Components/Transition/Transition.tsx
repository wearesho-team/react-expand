import * as React from "react";
import * as RTG from "react-transition-group";

import { TransitionProps, TransitionPropTypes } from "./TransitionProps";

export class Transition extends React.Component<TransitionProps> {
    public static readonly propTypes = TransitionPropTypes;

    public render(): React.ReactNode {
        const { status, timeout, ...childProps } = this.props;

        if (timeout <= 0) {
            return status && (
                <div {...childProps}>
                    {this.props.children}
                </div>
            );
        }

        return (
            <RTG.Transition
                timeout={timeout}
                unmountOnExit
                mountOnEnter
                in={status}
            >
                {this.renderWithStatus}
            </RTG.Transition>
        )
    }

    protected getClassName = (status: string): string => {
        return [this.props.className, status]
            .filter((name) => name)
            .join(" ")
            .trim();
    }

    protected renderWithStatus = (animationStatus: string): JSX.Element => {
        const { status, timeout, ...childProps } = this.props;

        return (
            <div {...childProps} className={this.getClassName(animationStatus)}>
                {this.props.children}
            </div>
        );
    }
}
