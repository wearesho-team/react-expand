import * as React from "react";
import * as PropTypes from "prop-types";

import { SliderControllerContextTypes, SliderControllerContext, Direction } from "./SliderController";

export interface SlideButtonProps extends React.HTMLProps<HTMLButtonElement> {
    direction: Direction
}

export const SlideButtonPropTypes: {[P in keyof SlideButtonProps]: PropTypes.Validator<any>} = {
    direction: PropTypes.string.isRequired
};

export class SlideButton extends React.Component<SlideButtonProps> {
    public static readonly contextTypes = SliderControllerContextTypes;
    public static readonly propTypes = SlideButtonPropTypes;

    public readonly context: SliderControllerContext;

    public render(): JSX.Element {
        const { direction, ...childProps } = this.props;

        return (
            <button
                type="button"
                {...childProps}
                onClick={this.handleClick}
                disabled={this.context.slideControl[this.props.direction].disabled}
            >
                {this.props.children}
            </button>
        );
    }

    protected handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        this.props.onClick && this.props.onClick(event);

        if (!event.defaultPrevented) {
            this.context.slideControl[this.props.direction].setAsActive();
        }
    }
}
