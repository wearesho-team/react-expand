import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContext, ExpandContextTypes } from "../../../src/Components/ExpandController";

export interface ComponentWithContextProps {
    expandKey: string;
}

export const ComponentWithContextPropTypes: {[P in keyof ComponentWithContextProps]: PropTypes.Validator<any>} = {
    expandKey: PropTypes.string.isRequired
};

export class ComponentWithContext extends React.Component<ComponentWithContextProps> {
    public static readonly propTypes = ComponentWithContextPropTypes;
    public static readonly contextTypes = ExpandContextTypes;

    public readonly context: ExpandContext;

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <button
                    type="button"
                    className="not-expand-button"
                    onClick={this.context.changeExpandState(this.props.expandKey)}
                />
                <div
                    className="component-with-context"
                    data-expand={this.props.expandKey}
                    data-is-open={this.context.isExpanded(this.props.expandKey)}
                >
                    <span>I have context</span>
                    <button
                        type="button"
                        className="expand-button"
                        data-expand={this.props.expandKey}
                        onClick={this.context.changeExpandState(this.props.expandKey)}
                    />
                </div>
            </React.Fragment>
        );
    }
}
