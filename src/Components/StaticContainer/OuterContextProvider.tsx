import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContext, ExpandContextTypes } from "../ExpandController";

export interface OuterContextProviderProps {
    context: ExpandContext;
}

export const OuterContextProviderPropTypes: {[P in keyof OuterContextProviderProps]: PropTypes.Validator<any>} = {
    context: PropTypes.shape(ExpandContextTypes).isRequired
}

export class OuterContextProvider extends React.Component<OuterContextProviderProps> {
    public static readonly propTypes = OuterContextProviderPropTypes;
    public static readonly childContextTypes = ExpandContextTypes;

    public getChildContext(): ExpandContext {
        return this.props.context;
    }

    public render(): React.ReactNode {
        return this.props.children;
    }
}
