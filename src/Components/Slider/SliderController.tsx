import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";

export enum Direction {
    prev = "prev",
    next = "next"
};

export interface SlideControlProps {
    disabled: boolean;
    setAsActive: () => void;
}

export interface SliderControllerContext {
    disableDrag: boolean;
    dragSensitive: number;
    slidesList: Array<string>;
    registerSlide: () => string;
    setAsActive: (id: string) => void;
    unregisterSlide: (id: string) => void;
    slideControl: {
        [Direction.next]: SlideControlProps;
        [Direction.prev]: SlideControlProps;
    },
}

const slideControlPropTypes: {[P in keyof SlideControlProps]: PropTypes.Validator<any>} = {
    disabled: PropTypes.bool.isRequired,
    setAsActive: PropTypes.func.isRequired
};

export const SliderControllerContextTypes: {[P in keyof SliderControllerContext]: PropTypes.Validator<any>} = {
    disableDrag: PropTypes.bool.isRequired,
    setAsActive: PropTypes.func.isRequired,
    registerSlide: PropTypes.func.isRequired,
    dragSensitive: PropTypes.number.isRequired,
    unregisterSlide: PropTypes.func.isRequired,
    slidesList: PropTypes.arrayOf(PropTypes.string).isRequired,
    slideControl: PropTypes.shape({
        [Direction.next]: PropTypes.shape(slideControlPropTypes).isRequired,
        [Direction.prev]: PropTypes.shape(slideControlPropTypes).isRequired,
    }).isRequired
};

export interface SliderControllerState {
    slides: Set<string>;
    activeSlide: number;
}

export interface SliderControllerProps {
    autoPlay?: boolean;
    disableDrag?: boolean;
    dragSensitive?: number;
    autoPlayDelay?: number;
}

export const SliderControllerPropTypes: {[P in keyof SliderControllerProps]: PropTypes.Validator<any>} = {
    dragSensitive: PropTypes.number,
    autoPlayDelay: PropTypes.number,
    disableDrag: PropTypes.bool,
    autoPlay: PropTypes.bool
};

export const SliderControllerDefaultProps: {[P in keyof SliderControllerProps]?: SliderControllerProps[P]} = {
    autoPlayDelay: 5000,
    dragSensitive: 150
};

export class SliderController extends React.Component<SliderControllerProps, SliderControllerState> {
    public static readonly childContextTypes = SliderControllerContextTypes;
    public static readonly defaultProps = SliderControllerDefaultProps;
    public static readonly propTypes = SliderControllerPropTypes;
    public static readonly contextTypes = ExpandContextTypes;

    public static slidesCount = 0;

    public readonly context: ExpandContext;
    public readonly state: SliderControllerState = {
        slides: new Set(),
        activeSlide: -1
    };

    protected timer: any;

    public getChildContext(): SliderControllerContext {
        return {
            slidesList: this.slidesArray,
            registerSlide: this.registerSlide,
            setAsActive: this.changeActiveSlide,
            disableDrag: !!this.props.disableDrag,
            unregisterSlide: this.unregisterSlide,
            dragSensitive: this.props.dragSensitive,
            slideControl: {
                [Direction.next]: {
                    disabled: this.state.activeSlide < 0 || this.state.activeSlide === this.state.slides.size - 1,
                    setAsActive: this.setAsActiveNext
                },
                [Direction.prev]: {
                    disabled: this.state.activeSlide <= 0,
                    setAsActive: this.setAsActivPrev
                }
            },
        };
    }

    public componentDidMount() {
        if (this.isNoActiveSlide && this.state.slides.size) {
            this.changeActiveSlide(this.slidesArray[0]);
        }

        if (this.props.autoPlay) {
            this.timer = setInterval(this.autoPlay, this.props.autoPlayDelay);
        }
    }

    public componentDidUpdate() {
        if (this.isNoActiveSlide && this.state.slides.size) {
            this.changeActiveSlide(this.slidesArray[0]);
        } else if (this.getSlideIndex(this.contextActiveSlide) !== this.state.activeSlide) {
            this.changeActiveSlide(this.contextActiveSlide);
        }
    }

    public componentWillUnmount() {
        clearInterval(this.timer);
    }

    public render(): React.ReactNode {
        return this.props.children;
    }

    protected registerSlide = (): string => {
        const id = `slide-${this.state.slides.size}-${SliderController.slidesCount}`;
        this.state.slides.add(id);
        this.forceUpdate();
        SliderController.slidesCount++;

        return id;
    }

    protected unregisterSlide = (id: string): void => {
        this.state.slides.delete(id);
        this.setState({ activeSlide: -1 });
    }

    protected changeActiveSlide = (id: string): void => {
        this.context.changeExpandState(id, true)();
        this.state.slides.forEach((slideId) => slideId !== id && this.context.changeExpandState(slideId, false)());

        this.setState({ activeSlide: this.getSlideIndex(id) });
    }

    protected setAsActiveNext = (): void => {
        if (this.state.activeSlide === this.state.slides.size - 1) {
            return;
        }

        this.changeActiveSlide(this.getSlideByIndex(this.state.activeSlide + 1));
    }

    protected setAsActivPrev = (): void => {
        if (this.state.activeSlide === 0) {
            return;
        }

        this.changeActiveSlide(this.getSlideByIndex(this.state.activeSlide - 1));
    }

    protected get slidesArray(): Array<string> {
        return Array.from(this.state.slides.values())
    }

    private autoPlay = (): void => {
        this.state.activeSlide === (this.state.slides.size - 1)
            ? this.changeActiveSlide(this.getSlideByIndex(0))
            : this.setAsActiveNext();
    }

    private getSlideIndex = (id: string): number => {
        return this.slidesArray.findIndex((slideId) => id === slideId);
    }

    private getSlideByIndex = (index: number): string => {
        return this.slidesArray[index];
    }

    private get contextActiveSlide(): string {
        return this.slidesArray.find((id) => this.context.isExpanded(id));
    }

    private get isNoActiveSlide(): boolean {
        return this.contextActiveSlide === undefined;
    }
}
