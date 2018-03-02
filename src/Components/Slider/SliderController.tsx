import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";

export enum Direction {
    prev = "prev",
    next = "next"
};

export interface SliderControllerContext {
    registerSlide: () => string;
    setAsActive: (id: string) => void;
    unregisterSlide: (id: string) => void;
    slideControl: {
        [Direction.next]: {
            disabled: boolean;
            setAsActive: () => void;
        },
        [Direction.prev]: {
            disabled: boolean;
            setAsActive: () => void;
        }
    },
    slidesList: Array<string>;
}

export const SliderControllerContextTypes: {[P in keyof SliderControllerContext]: PropTypes.Validator<any>} = {
    unregisterSlide: PropTypes.func.isRequired,
    registerSlide: PropTypes.func.isRequired,
    setAsActive: PropTypes.func.isRequired,
    slideControl: PropTypes.shape({
        [Direction.next]: PropTypes.shape({
            disabled: PropTypes.bool.isRequired,
            setAsActive: PropTypes.func.isRequired
        }).isRequired,
        [Direction.prev]: PropTypes.shape({
            disabled: PropTypes.bool.isRequired,
            setAsActive: PropTypes.func.isRequired
        }).isRequired,
    }).isRequired,
    slidesList: PropTypes.arrayOf(PropTypes.string).isRequired
};

export interface SliderControllerState {
    slides: Set<string>;
    activeSlide: number;
}

export interface SliderControllerProps {
    autoPlay?: boolean;
    autoPlayDelay?: number;
}

export const SliderControllerPropTypes: {[P in keyof SliderControllerProps]: PropTypes.Validator<any>} = {
    autoPlayDelay: PropTypes.number,
    autoPlay: PropTypes.bool
};

export const SliderControllerDefaultProps: {[P in keyof SliderControllerProps]?: SliderControllerProps[P]} = {
    autoPlayDelay: 5000
};

export class SliderController extends React.Component<SliderControllerProps> {
    public static readonly childContextTypes = SliderControllerContextTypes;
    public static readonly defaultProps = SliderControllerDefaultProps;
    public static readonly propTypes = SliderControllerPropTypes;
    public static readonly contextTypes = ExpandContextTypes;

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
            unregisterSlide: this.unregisterSlide,
            slideControl: {
                [Direction.next]: {
                    disabled: this.state.activeSlide < 0 || this.state.activeSlide === this.state.slides.size - 1,
                    setAsActive: this.setAsActiveNext
                },
                [Direction.prev]: {
                    disabled: this.state.activeSlide < 0 || this.state.activeSlide === 0,
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
        }
    }

    public componentWillUnmount() {
        clearInterval(this.timer);
    }

    public render(): React.ReactNode {
        return this.props.children;
    }

    protected registerSlide = (): string => {
        const id = `slide-${this.state.slides.size}-${Date.now().toString()}`;
        this.state.slides.add(id);
        this.forceUpdate();

        return id;
    }

    protected unregisterSlide = (id: string): void => {
        this.state.slides.delete(id);
        this.setState({
            activeSlide: -1
        });
    }

    protected changeActiveSlide = (id: string): void => {
        this.state.slides.forEach((slideId) => slideId !== id && this.context.changeExpandState(slideId, false)());

        this.context.changeExpandState(id, true)();
        this.setState({
            activeSlide: this.getSlideIndex(id)
        });
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

    private autoPlay = () => {
        if (this.state.activeSlide === this.state.slides.size - 1) {
            this.changeActiveSlide(this.getSlideByIndex(0));
        } else {
            this.setAsActiveNext();
        }
    }

    private getSlideIndex = (id: string): number => {
        return this.slidesArray.findIndex((slideId) => id === slideId);
    }

    private getSlideByIndex = (index: number): string => {
        return this.slidesArray[index];
    }

    private get isNoActiveSlide(): boolean {
        return !this.slidesArray.find((id) => this.context.isExpanded(id));
    }
}
