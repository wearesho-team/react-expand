import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";

export interface CollapseProps {
    controlElement: (arg: { state: boolean, onClick: () => void }) => JSX.Element;
    wrapperProps?: React.HTMLProps<HTMLDivElement>;
    defaultOpened?: boolean;
    collapseId?: string;
}

export const CollapsePropTypes: {[P in keyof CollapseProps]: PropTypes.Validator<any>} = {
    controlElement: PropTypes.func.isRequired,
    wrapperProps: PropTypes.object,
    defaultOpened: PropTypes.bool,
    collapseId: PropTypes.string
};

export const CollapseDefaultProps: {[P in keyof CollapseProps]?: CollapseProps[P]} = {
    wrapperProps: {},
    collapseId: `collapse-${Date.now().toString() + Math.random().toString()}`
};

export class Collapse extends React.Component<CollapseProps> {
    public static readonly defaultProps = CollapseDefaultProps;
    public static readonly contextTypes = ExpandContextTypes;
    public static readonly propTypes = CollapsePropTypes;

    public readonly context: ExpandContext;

    public componentDidMount() {
        this.context.changeExpandState(this.props.collapseId, !!this.props.defaultOpened)();
    }

    public render(): JSX.Element {
        return (
            <div {...this.props.wrapperProps} data-expand-keep={this.props.collapseId}>
                {this.controlElement()}
                {this.context.isExpanded(this.props.collapseId) && this.props.children}
            </div>
        );
    }

    protected controlElement = (): JSX.Element => (
        this.props.controlElement({
            state: this.context.isExpanded(this.props.collapseId),
            onClick: this.context.changeExpandState(this.props.collapseId)
        })
    )
}
