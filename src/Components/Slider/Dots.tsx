import * as React from "react";
import * as PropTypes from "prop-types";

import { SliderControllerContext, SliderControllerContextTypes } from "./SliderControllerProps";
import { ExpandContext, ExpandContextTypes } from "../ExpandController";

export interface DotsProps extends React.HTMLProps<HTMLButtonElement> {
    activeClassName?: string;
}

export const DotsPropTypes: {[P in keyof DotsProps]: PropTypes.Validator<any>} = {
    activeClassName: PropTypes.string
};

export const DotsDefaultProps: {[P in keyof DotsProps]?: DotsProps[P]} = {
    activeClassName: "is-active"
};

export class Dots extends React.Component<DotsProps> {
    public static readonly contextTypes = {
        ...SliderControllerContextTypes,
        ...ExpandContextTypes
    };
    public static readonly defaultProps = DotsDefaultProps;
    public static readonly propTypes = DotsPropTypes;

    public readonly context: SliderControllerContext & ExpandContext;

    public render(): React.ReactNode {
        const { activeClassName, ...childProps } = this.props;

        return this.context.slidesList.map((id) => (
            <button
                type="button"
                {...childProps}
                className={this.getClassName(id)}
                onClick={this.handleClick(id)}
                key={id}
            >
                {this.props.children}
            </button>
        ));
    }

    protected getClassName = (id: string): string => {
        const { className, activeClassName } = this.props;
        return `${className || ""}${this.context.isExpanded(id) ? ` ${activeClassName}` : ""}`.trim();
    }

    protected handleClick = (id: string) => (event: React.MouseEvent<HTMLButtonElement>): void => {
        this.props.onClick && this.props.onClick(event);

        if (!event.defaultPrevented) {
            this.context.setAsActive(id);
        }
    }
}
