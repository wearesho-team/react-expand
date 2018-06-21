import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";

export interface HashListenerProps {
    onHashExpanded?: (expandId: string) => void;
}

export const HashListenerPropTypes: {[P in keyof HashListenerProps]: PropTypes.Validator<any>} = {
    onHashExpanded: PropTypes.func
};

export class HashListener extends React.Component<HashListenerProps> {
    public static readonly contextTypes = ExpandContextTypes;
    public static readonly propTypes = HashListenerPropTypes;

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
            this.props.onHashExpanded && this.props.onHashExpanded(hashId);
        });
    }

    protected get hashElements(): Array<string> {
        return (location.hash.match(/#[^#\/\s]*/g) || [])
            .join("")
            .split("#")
            .filter((hash) => !!hash)
    }
}
