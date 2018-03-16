import * as PropTypes from "prop-types";

export interface TabsContext {
    changeActiveTab: (id: string) => void;
    unregisterTab: (id: string) => void;
    registerTab: (id: string) => void;
}

export const TabsContextTypes: {[P in keyof TabsContext]: PropTypes.Validator<any>} = {
    changeActiveTab: PropTypes.func.isRequired,
    unregisterTab: PropTypes.func.isRequired,
    registerTab: PropTypes.func.isRequired
};
