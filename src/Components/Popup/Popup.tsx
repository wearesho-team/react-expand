import * as React from "react";
import * as PropTypes from "prop-types";
import {ExpandContext, ExpandContextTypes} from "../ExpandController";

export interface PopupProps extends React.HTMLProps<HTMLDivElement> {
    popupId: string;
}

export const PopupPropTypes = {
    popupId: PropTypes.string.isRequired,
};

export class Popup extends React.Component<PopupProps> {
    public static readonly propTypes = PopupPropTypes;
    public static readonly contextTypes = ExpandContextTypes;

    public readonly context: ExpandContext;

    public render() {
        const { popupId, ...props } = this.props;

        if (!this.context.isExpanded(popupId)) {
            return null;
        }

        return (
            <div {...props} onMouseOut={this.handleMouseOut}>
                {this.props.children}
            </div>
        );
    }

    protected handleMouseOut = () => {
        this.context.changeExpandState(this.props.popupId, false)();
    }
}
