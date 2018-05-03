import * as React from "react";
import * as PropTypes from "prop-types";

import { SliderControllerContextTypes, SliderControllerContext } from "./SliderControllerProps";
import { ExpandContextTypes, ExpandContext } from "../ExpandController";
import { ControlledExpandElement } from "../ControlledExpandElement";

export interface SlideProps extends React.HTMLProps<HTMLDivElement> {
    ref?: any;
    initial?: boolean;
}

export const SlidePropTypes: {[P in keyof SlideProps]: PropTypes.Validator<any>} = {
    initial: PropTypes.bool,
};

export class Slide extends React.Component<SlideProps> {
    public static readonly contextTypes = {
        ...SliderControllerContextTypes,
        ...ExpandContextTypes
    };
    public static readonly propTypes = SlidePropTypes;

    public readonly context: SliderControllerContext & ExpandContext;

    protected prevTouchPosition: number;
    protected id: string;

    constructor(props, context: SliderControllerContext & ExpandContext) {
        super(props, context);

        // in some cases id does not generating on didMount
        this.id = context.registerSlide();
    }

    public componentDidMount() {
        // must be updated after generating id
        this.forceUpdate();

        this.props.initial && this.context.setAsActive(this.id);
    }

    public componentWillUnmount() {
        this.context.unregisterSlide(this.id);
    }

    public render(): React.ReactNode {
        const { initial, ...childProps } = this.props;

        return (
            <ControlledExpandElement
                expandId={this.id}
                {...childProps}
                {...(this.context.disableDrag ? {} : {
                    onMouseUp: this.handleMouseUp,
                    onTouchEnd: this.handleTouchEnd,
                    onMouseDown: this.handleMouseDown,
                    onTouchStart: this.handleTouchStart
                })}
                animationTimeout={this.context.animationTimeout}
            >
                {this.props.children}
            </ControlledExpandElement>
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

        if (delta > this.context.dragSensitive) {
            this.context.slideControl.next.setAsActive();
        } else if (delta < this.context.dragSensitive * (-1)) {
            this.context.slideControl.prev.setAsActive();
        }
    }
}
