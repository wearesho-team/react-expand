import * as React from "react";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";

export class HashListener extends React.Component {
    public static readonly contextTypes = ExpandContextTypes;

    public readonly context: ExpandContext;

    public componentDidMount() {
        addEventListener("hashchange", this.handleHashChange);

        this.handleHashChange();
    }

    public componentWillUnmount() {
        removeEventListener("hashchange", this.handleHashChange);
    }

    public render(): React.ReactNode {
        return this.props.children;
    }

    protected handleHashChange = (): void => {
        this.hashElements.forEach((hashId) => {
            this.context.changeExpandState(hashId, true)();
        });
    }

    protected get hashElements(): Array<string> {
        return (location.hash.match(/#[^#\/\s]*/g) || [])
            .join("")
            .split("#")
            .filter((hash) => !!hash)
    }
}
