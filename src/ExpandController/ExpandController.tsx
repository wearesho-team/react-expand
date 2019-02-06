import * as React from "react";
import { ExpandContext, ExpandContextValue } from "./ExpandContext";

export interface ExpandControllerState {
    expanded: { [key: string]: boolean };
    state: { [key: string]: any };
}

export class ExpandController extends React.Component<{}, ExpandControllerState> {
    public readonly state = {
        expanded: {},
        state: {},
    };

    protected get childContextValue(): ExpandContextValue {
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
        return <ExpandContext.Provider value={this.childContextValue} children={this.props.children} />;
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

    protected isExpanded: ExpandContext["isExpanded"] = (key: string): boolean => !!this.state.expanded[key];

    protected getExpandState = (key: string) => this.state.state[key];

    protected handleDocumentClick = (event: any): void => {
        const target = event.target;
        const shouldBeDisabled = new Set(Object.keys(this.state.expanded));

        const filter = (node: HTMLElement): boolean => {
            shouldBeDisabled.delete(node.getAttribute("data-expand"));
            return (node.parentElement instanceof HTMLElement) && filter(node.parentElement);
        };
        target instanceof HTMLElement && filter(target);

        Array.from(document.querySelectorAll("[data-expand-keep]"))
            .map((node) => {
                const attr = node.getAttribute("data-expand-keep");
                !!attr && shouldBeDisabled.delete(attr);
            });

        shouldBeDisabled.forEach((key: string) => this.state.expanded[key] = false);

        this.forceUpdate();
    }
}
