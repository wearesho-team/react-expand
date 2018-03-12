import * as React from "react";
import * as PropTypes from "prop-types";

export interface ExpandContext<TState = any> {
    changeExpandState: (key: string, open?: boolean, state?: TState) => () => void;
    isExpanded: (key: string) => boolean;
    getState: (key: string) => TState;
}

export const ExpandContextTypes = {
    changeExpandState: PropTypes.func.isRequired,
    isExpanded: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
};

export interface ExpandControllerState {
    expanded: { [key: string]: boolean };
    state: { [key: string]: any };
}

export class ExpandController extends React.Component<{}, ExpandControllerState> {
    public static readonly childContextTypes = ExpandContextTypes;
    public readonly state = {
        expanded: {},
        state: {},
    };

    public getChildContext(): ExpandContext {
        return {
            changeExpandState: this.getExpandOpenHandler,
            getState: this.getExpandState,
            isExpanded: this.isExpanded,
        }
    }

    public componentDidMount() {
        document.addEventListener<"click">("click", this.handleDocumentClick);
    }

    public componentWillUnmount() {
        document.removeEventListener("click", this.handleDocumentClick);
    }

    public render() {
        return this.props.children;
    }

    protected getExpandOpenHandler: ExpandContext["changeExpandState"] =
        (key: string, open?: boolean, state: any = undefined) => (): void => {
            if (open === undefined) {
                open = !this.isExpanded(key);
            }

            if (this.isExpanded(key) !== open) {
                this.state.expanded[key] = open;
            }

            this.state.state[key] = state;

            this.forceUpdate();
        }

    protected isExpanded: ExpandContext["isExpanded"] = (key: string): boolean => {
        return !!this.state.expanded[key];
    }

    protected getExpandState = (key: string) => {
        return this.state.state[key];
    }

    protected handleDocumentClick = (event: any): void => {
        const target = event.target;
        const shouldBeDisabled = new Set(Object.keys(this.state.expanded));

        const filter = (node: HTMLElement): boolean => {
            shouldBeDisabled.delete(node.getAttribute("data-expand"));
            return (node.parentElement instanceof HTMLElement) && filter(node.parentElement);
        };
        target instanceof HTMLElement && filter(target);

        Array.from(document.querySelectorAll("[data-expand-keep]"))
            .forEach((node) => shouldBeDisabled.delete(node.getAttribute("data-expand-keep")));

        shouldBeDisabled.forEach((key: string) => this.state.expanded[key] = false);

        this.forceUpdate();
    }
}
