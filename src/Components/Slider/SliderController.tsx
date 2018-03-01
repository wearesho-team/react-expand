import * as React from "react";
import * as PropTypes from "prop-types";

import { SliderControllerContextTypes, SliderControllerContext } from "./SliderProps";
import { ExpandContextTypes, ExpandContext } from "../ExpandController";

export interface SliderControllerState {
    slides: Set<string>;
}

export class SliderController extends React.Component<{}, SliderControllerState> {
    public static readonly childContextTypes = SliderControllerContextTypes;
    public static readonly contextTypes = ExpandContextTypes;

    public readonly context: ExpandContext;

    public getChildContext(): SliderControllerContext {
        return {
            registerSlide: this.registerSlide,
            setAsActive: this.changeActiveSlide,
            unregisterSlide: this.unregisterSlide
        };
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
    }
}
