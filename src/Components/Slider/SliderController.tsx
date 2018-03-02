import * as React from "react";
import * as PropTypes from "prop-types";

import { SliderControllerContextTypes, SliderControllerContext, Direction } from "./SliderProps";
import { ExpandContextTypes, ExpandContext } from "../ExpandController";
import { SlideProps } from "./Slide";

export interface SliderControllerState {
    slides: Set<string>;
    activeSlide: number;
}

export class SliderController extends React.Component<{}, SliderControllerState> {
    public static readonly childContextTypes = SliderControllerContextTypes;
    public static readonly contextTypes = ExpandContextTypes;

    public readonly context: ExpandContext;

    public getChildContext(): SliderControllerContext {
        return {
            registerSlide: this.registerSlide,
            setAsActive: this.changeActiveSlide,
            unregisterSlide: this.unregisterSlide,
            slideControl: {
                [Direction.next]: {
                    disabled: this.state.activeSlide === this.state.slides.size,
                    setAsActive: this.setAsActiveNext
                },
                [Direction.prev]: {
                    disabled: this.state.activeSlide === 0,
                    setAsActive: this.setAsActivPrev
                } 
            }
        };
    }

    public componentDidMount() {
        const slidesArray = Array.from(this.state.slides.values());
        if (!slidesArray.find((id) => this.context.isExpanded(id))) {
            this.changeActiveSlide(slidesArray[0]);
        }
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
        this.forceUpdate();
    }

    protected changeActiveSlide = (id: string): void => {
        this.state.slides.forEach((slideId) => slideId !== id && this.context.changeExpandState(slideId, false)());

        this.context.changeExpandState(id, true)();
        this.setState({
            activeSlide: this.getSlideIndex(id)
        });
    }

    protected setAsActiveNext = (): void => {
        if (this.state.activeSlide === this.state.slides.size) {
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

    private getSlideIndex = (id: string): number => {
        return Array.from(this.state.slides.values()).findIndex((slideId) => id === slideId);
    }

    private getSlideByIndex = (index: number): string => {
        return Array.from(this.state.slides.values())[index];
    }
}
