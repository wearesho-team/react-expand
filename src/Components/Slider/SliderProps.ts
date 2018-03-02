import * as PropTypes from "prop-types";

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
    }
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
};
