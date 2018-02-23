import * as PropTypes from "prop-types";

export interface TabElementProps extends React.HTMLProps<HTMLDivElement> {
    tabId: string
    activeClassName?: string;
}

export const TabElementPropTypes: {[P in keyof TabElementProps]: PropTypes.Validator<any>} = {
    tabId: PropTypes.string.isRequired,
    activeClassName: PropTypes.string
};

export const TabElementDefaultProps: {[P in keyof TabElementProps]?: TabElementProps[P]} = {
    activeClassName: "active"
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
