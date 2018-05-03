import * as PropTypes from "prop-types";

import { TransitionChildProps, TransitionChildPropTypes, TransitionChildDefaultProps } from "../Transition";

export enum Direction {
    prev = "prev",
    next = "next"
};

export interface SlideControlProps {
    disabled: boolean;
    setAsActive: () => void;
}

export interface SliderControllerContext extends TransitionChildProps {
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

export const slideControlPropTypes: {[P in keyof SlideControlProps]: PropTypes.Validator<any>} = {
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
    }).isRequired,
    ...TransitionChildPropTypes
};

export interface SliderControllerProps extends TransitionChildProps {
    autoPlay?: boolean;
    disableDrag?: boolean;
    dragSensitive?: number;
    autoPlayDelay?: number;
}

export const SliderControllerPropTypes: {[P in keyof SliderControllerProps]: PropTypes.Validator<any>} = {
    dragSensitive: PropTypes.number,
    autoPlayDelay: PropTypes.number,
    disableDrag: PropTypes.bool,
    autoPlay: PropTypes.bool,
    ...TransitionChildPropTypes
};

export const SliderControllerDefaultProps: {[P in keyof SliderControllerProps]?: SliderControllerProps[P]} = {
    autoPlayDelay: 5000,
    dragSensitive: 150,
    ...TransitionChildDefaultProps
};
