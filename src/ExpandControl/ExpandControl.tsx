import * as React from "react";

import { ExpandContext, ExpandContextValue } from "../ExpandController";
import { ExpandControlProps, ExpandControlDefaultProps } from "./ExpandControlProps";

export class ExpandControl extends React.Component<ExpandControlProps> {
    public static readonly contextType = ExpandContext;
    public static readonly defaultProps = ExpandControlDefaultProps;

    public readonly context: ExpandContextValue;

    public componentDidMount() {
        this.props.activeOnMount && this.context.changeExpandState(this.props.expandId, true)();
    }

    public render(): React.ReactNode {
        const {
            activeClassName,
            activeOnMount,
            triggerEvent,
            staticState,
            expandId,
            state,
            ...childProps
        } = this.props;

        return (
            <button
                {...childProps}
                type="button"
                data-expand={expandId}
                {...this.triggerEvent}
                className={this.className}
            >
                {this.props.children}
            </button>
        );
    }

    protected handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        this.props.onClick && this.props.onClick(event);

        !event.defaultPrevented && this.action(!this.context.isExpanded(this.props.expandId));
    }

    protected handleMouseOver = (event: React.MouseEvent<HTMLButtonElement>): void => {
        this.props.onMouseOver && this.props.onMouseOver(event);

        !event.defaultPrevented && this.action(true);
    }

    protected handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>): void => {
        this.props.onMouseLeave && this.props.onMouseLeave(event);

        !event.defaultPrevented && this.action(false);
    }

    protected handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>): void => {
        this.props.onTouchStart && this.props.onTouchStart(event);

        !event.defaultPrevented && this.action(!this.context.isExpanded(this.props.expandId));
    }

    private get className(): string {
        const { className, activeClassName, expandId } = this.props;
        return `${(className || "")}${this.context.isExpanded(expandId) ? ` ${activeClassName}` : ""}`.trim();
    }

    private get triggerEvent() {
        switch (this.props.triggerEvent) {
            case "click":
                return {
                    onClick: this.handleClick
                };
            case "hover":
                return {
                    onTouchStart: this.handleTouchStart,
                    onMouseLeave: this.handleMouseLeave,
                    onMouseOver: this.handleMouseOver
                };
            default:
                return {
                    onClick: this.handleClick
                };
        }
    }

    private action = (state: boolean): void => {
        const prevState = this.context.isExpanded(this.props.expandId);
        const nextState = this.props.staticState === undefined
            ? state
            : this.props.staticState;

        if (prevState !== nextState) {
            this.context.changeExpandState(this.props.expandId, nextState, this.props.state)();
        }
    }
}
