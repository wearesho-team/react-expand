import * as PropTypes from "prop-types";

export interface TabElementProps {
    wrapperProps?: React.HTMLProps<HTMLDivElement>;
    tabId: string
}

export const TabElementPropTypes: {[P in keyof TabElementProps]: PropTypes.Validator<any>} = {
    tabId: PropTypes.string.isRequired,
    wrapperProps: PropTypes.object
};

export const TabElementDefaultProps: {[P in keyof TabElementProps]?: TabElementProps[P]} = {
    wrapperProps: {}
};

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
