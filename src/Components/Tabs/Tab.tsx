import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";
import {
    TabsContext,
    TabElementProps,
    TabsContextTypes,
    TabElementPropTypes
} from "./TabsProps";

export class Tab extends React.Component<TabElementProps> {
    public static readonly contextTypes = {
        ...ExpandContextTypes,
        ...TabsContextTypes
    };
    public static readonly propTypes = TabElementPropTypes;

    public readonly context: ExpandContext & TabsContext;

    public componentDidMount() {
        this.context.registerTab(this.props.tabId);
    }

    public componentWillUnmount() {
        this.context.unregisterTab(this.props.tabId);
    }

    public render(): JSX.Element {
        const { tabId, ...childProps } = this.props;

        return (
            <div
                {...childProps}
                className="tab"
                data-expand-keep={tabId}
            >
                {this.context.isExpanded(tabId) && this.props.children}
            </div>
        );
    }
}
