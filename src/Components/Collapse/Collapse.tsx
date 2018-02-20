import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";

export interface CollapseProps extends React.HTMLProps<HTMLDivElement> {
    controlElement: (arg: { state: boolean, onClick: () => void }) => JSX.Element;
    defaultOpened?: boolean;
    collapseId?: string;
}

export const CollapsePropTypes: {[P in keyof CollapseProps]: PropTypes.Validator<any>} = {
    controlElement: PropTypes.func.isRequired,
    defaultOpened: PropTypes.bool,
    collapseId: PropTypes.string
};

export const CollapseDefaultProps: {[P in keyof CollapseProps]?: CollapseProps[P]} = {
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
        const { collapseId, children, defaultOpened, controlElement, ...childProps } = this.props;

        return (
            <div {...childProps} data-expand-keep={collapseId}>
                {this.controlElement()}
                {this.context.isExpanded(collapseId) && children}
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
