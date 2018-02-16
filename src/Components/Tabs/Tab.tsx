import * as React from "react";
import * as PropTypes from "prop-types";

import { ExpandContextTypes, ExpandContext } from "../ExpandController";
import {
    TabsContext,
    TabElementProps,
    TabsContextTypes,
    TabElementPropTypes,
    TabElementDefaultProps,
} from "./TabsProps";

export class Tab extends React.Component<TabElementProps> {
    public static readonly contextTypes = {
        ...ExpandContextTypes,
        ...TabsContextTypes
    };
    public static readonly propTypes = TabElementPropTypes;
    public static readonly defaultProps = TabElementDefaultProps;

    public readonly context: ExpandContext & TabsContext;

    public componentDidMount() {
        this.context.registerTab(this.props.tabId);
    }

    public componentWillUnmount() {
        this.context.unregisterTab(this.props.tabId);
    }

    public render(): JSX.Element {
        return (
            <div {...this.props.wrapperProps} data-expand-keep={this.props.tabId}>
                {this.context.isExpanded(this.props.tabId) && this.props.children}
            </div>
        );
    }
}
