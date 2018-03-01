import * as PropTypes from "prop-types";

export interface SliderControllerContext {
    registerSlide: () => string;
    setAsActive: (id: string) => void;
    unregisterSlide: (id: string) => void;
}

export const SliderControllerContextTypes: {[P in keyof SliderControllerContext]: PropTypes.Validator<any>} = {
    unregisterSlide: PropTypes.func.isRequired,
    registerSlide: PropTypes.func.isRequired,
    setAsActive: PropTypes.func.isRequired
};
