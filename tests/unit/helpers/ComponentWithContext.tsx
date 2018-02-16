import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContext, ExpandContextTypes } from "../../../src/Components/ExpandController";

export interface ComponentWithContextProps extends React.HTMLAttributes<HTMLDivElement> {
    expandKey: string;
}

export const ComponentWithContextPropTypes: {[P in keyof ComponentWithContextProps]: PropTypes.Validator<any>} = {
    expandKey: PropTypes.string.isRequired,
};

export class ComponentWithContext extends React.Component<ComponentWithContextProps> {
    public static readonly propTypes = ComponentWithContextPropTypes;
    public static readonly contextTypes = ExpandContextTypes;

    public readonly context: ExpandContext;

    public render(): JSX.Element {
        const {expandKey, ...childProps} = this.props;
        return (
            <div
                className="component-with-context"
                {...childProps}
            >
                <span>I have context</span>
                <button
                    type="button"
                    className="expand-button"
                    onClick={this.context.changeExpandState(expandKey)}
                />
            </div>
        );
    }
}
