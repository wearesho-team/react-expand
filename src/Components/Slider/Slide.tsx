import * as React from "react";
import * as PropTypes from "prop-types";

import { SliderControllerContextTypes, SliderControllerContext } from "./SliderProps";

export interface SlideProps extends React.HTMLProps<HTMLDivElement> {
    initial?: boolean
}

export const SlidePropTypes: {[P in keyof SlideProps]: PropTypes.Validator<any>} = {
    initial: PropTypes.bool
};

export class Slide extends React.Component<SlideProps> {
    public static readonly contextTypes = SliderControllerContextTypes;
    public static readonly propTypes = SlidePropTypes;

    public readonly context: SliderControllerContext;

    protected id: string;

    public componentWillMount() {
        this.id = this.context.registerSlide();

        this.props.initial && this.context.setAsActive(this.id);
    }

    public componentWillUnmount() {
        this.context.unregisterSlide(this.id);
    }

    public render(): JSX.Element {
        const { initial, ...childProps } = this.props;

        return (
            <div
                {...childProps}
                data-expand-keep={this.id}
            >
                {this.props.children}
            </div>
        );
    }
}