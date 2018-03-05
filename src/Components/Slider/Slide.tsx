import * as React from "react";
import * as PropTypes from "prop-types";

import { SliderControllerContextTypes, SliderControllerContext } from "./SliderController";
import { ExpandContextTypes, ExpandContext } from "../ExpandController";

export interface SlideProps extends React.HTMLProps<HTMLDivElement> {
    initial?: boolean;
    disableDrag?: boolean;
    dragSensitive?: number;
}

export const SlidePropTypes: {[P in keyof SlideProps]: PropTypes.Validator<any>} = {
    initial: PropTypes.bool,
    disableDrag: PropTypes.bool,
    dragSensitive: PropTypes.number
};

export const SlideDefaultProps: {[P in keyof SlideProps]?: SlideProps[P]} = {
    dragSensitive: 150
}

export class Slide extends React.Component<SlideProps> {
    public static readonly contextTypes = {
        ...SliderControllerContextTypes,
        ...ExpandContextTypes
    };
    public static readonly defaultProps = SlideDefaultProps;
    public static readonly propTypes = SlidePropTypes;

    public readonly context: SliderControllerContext & ExpandContext;

    protected prevTouchPosition: number;
    protected id: string;

    public componentDidMount() {
        this.id = this.context.registerSlide();

        this.props.initial && this.context.setAsActive(this.id);
    }

    public componentWillUnmount() {
        this.context.unregisterSlide(this.id);
    }

    public render(): JSX.Element {
        const { initial, disableDrag, dragSensitive, ...childProps } = this.props;

        return (
            this.context.isExpanded(this.id) && (
                <div
                    {...childProps}
                    data-expand-keep={this.id}
                    {...(disableDrag ? {} : {
                        onMouseUp: this.handleMouseUp,
                        onTouchEnd: this.handleTouchEnd,
                        onMouseDown: this.handleMouseDown,
                        onTouchStart: this.handleTouchStart
                    })}
                >
                    {this.props.children}
                </div>
            )
        );
    }

    protected handleMouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.preventDefault();
        this.dragStart(event.clientX);
    }

    protected handleMouseUp = (event: React.MouseEvent<HTMLDivElement>): void => {
        this.dragEnd(event.clientX);
    }

    protected handleTouchStart = (event: React.TouchEvent<HTMLDivElement>): void => {
        this.dragStart(event.changedTouches[0].clientX);
    }

    protected handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>): void => {
        this.dragEnd(event.changedTouches[0].clientX);
    }

    private dragStart = (clientX: number): void => {
        this.prevTouchPosition = clientX;
    }

    private dragEnd = (clientX: number): void => {
        const delta = this.prevTouchPosition - clientX;

        if (delta > this.props.dragSensitive) {
            this.context.slideControl.next.setAsActive();
        } else if (delta < this.props.dragSensitive * (-1)) {
            this.context.slideControl.prev.setAsActive();
        }
    }
}
