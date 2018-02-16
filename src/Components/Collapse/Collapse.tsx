import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";

export interface CollapseProps {
    controlElement: (arg: { state: boolean, onClick: () => void }) => JSX.Element;
    wrapperProps?: React.HTMLProps<HTMLDivElement>;    
    defaultOpened?: boolean;
}

export const CollapsePropTypes: {[P in keyof CollapseProps]: PropTypes.Validator<any>} = {
    controlElement: PropTypes.func.isRequired,
    wrapperProps: PropTypes.object,
    defaultOpened: PropTypes.bool
};

export const CollapseDefaultProps: {[P in keyof CollapseProps]?: CollapseProps[P]} = {
    wrapperProps: {}
};

export class Collapse extends React.Component<CollapseProps> {
    public static readonly defaultProps = CollapseDefaultProps;
    public static readonly contextTypes = ExpandContextTypes;
    public static readonly propTypes = CollapsePropTypes;

    public readonly context: ExpandContext;

    private id = `collapse-${Date.now().toString() + Math.random().toString()}`;

    public componentDidMount() {
        this.context.changeExpandState(this.id, this.props.defaultOpened)();
    }

    public render(): JSX.Element {
        return (
            <div {...this.props.wrapperProps} data-expand-keep={this.id}>
                {this.props.controlElement({
                    state: this.context.isExpanded(this.id),
                    onClick: this.context.changeExpandState(this.id)
                })}
                {this.context.isExpanded(this.id) && this.props.children}
            </div>
        );
    }
}
