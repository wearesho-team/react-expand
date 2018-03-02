import * as React from "react";
import * as PropTypes from "prop-types";

import { Slide } from "./Slide";

export interface SlideGroupProps {
    groupSize: number;
    initialGroup?: number;
    disableDrag?: boolean;
}

export const SlideGroupPropTypes: {[P in keyof SlideGroupProps]: PropTypes.Validator<any>} = {
    groupSize: PropTypes.number.isRequired,
    initialGroup: PropTypes.number,
    disableDrag: PropTypes.bool
};

export class SlideGroup extends React.Component<SlideGroupProps> {
    public static readonly propTypes = SlideGroupPropTypes;

    public render(): React.ReactNode {
        return [].concat(
            React.Children.map(this.props.children, (child: React.ReactElement<any>, i) => i % this.props.groupSize
                ? null
                : (
                    <Slide
                        initial={Math.round(i / this.props.groupSize) === (this.props.initialGroup - 1)}
                        disableDrag={this.props.disableDrag}
                        key={i}
                    >
                        {React.Children.toArray(this.props.children).slice(i, i + this.props.groupSize)}
                    </Slide>
                )
            )
        );
    }
}
