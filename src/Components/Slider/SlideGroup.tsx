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
        const { initialGroup, groupSize, disableDrag } = this.props;

        return React.Children.map(this.props.children, (child: React.ReactElement<any>, i) => i % groupSize
            ? null
            : (
                <Slide
                    initial={initialGroup && Math.round(i / groupSize) === (initialGroup - 1)}
                    disableDrag={disableDrag}
                    key={i}
                >
                    {React.Children.toArray(this.props.children).slice(i, i + groupSize)}
                </Slide>
            )
        );
    }
}
