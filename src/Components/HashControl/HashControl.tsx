import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";

export interface HashControlProps extends React.HTMLProps<HTMLAnchorElement> {
    activeClassName?: string;
}

export const HashControlPropTypes: {[P in keyof HashControlProps]: PropTypes.Validator<any>} = {
    activeClassName: PropTypes.string
};

export const HashControlDefaultProps: {[P in keyof HashControlProps]?: HashControlProps[P]} = {
    activeClassName: "active-control"
};

export class HashControl extends React.Component<HashControlProps> {
    public static readonly defaultProps = HashControlDefaultProps;
    public static readonly contextTypes = ExpandContextTypes;
    public static readonly propTypes = HashControlPropTypes;

    public readonly context: ExpandContext;

    public render(): React.ReactNode {
        const { activeClassName, ...htmlProps } = this.props;

        return (
            <a {...htmlProps} className={this.className}>
                {this.props.children}
            </a>
        );
    }

    protected get className(): string {
        const isActive = this.props.href.match(/#[^#\/\s]*/g)
            .some((hash) => this.context.isExpanded(hash.slice(1)));
        return `${this.props.className || ""} ${isActive ? this.props.activeClassName : ""}`.trim();
    }
}
