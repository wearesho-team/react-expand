import * as React from "react";
import * as PropTypes from "prop-types";

import { Slide } from "./Slide";

export interface SlideGroupProps {
    groupSize: number;
    initialGroup?: number;
}

export const SlideGroupPropTypes: {[P in keyof SlideGroupProps]: PropTypes.Validator<any>} = {
    groupSize: PropTypes.number.isRequired,
    initialGroup: PropTypes.number,
};

export class SlideGroup extends React.Component<SlideGroupProps> {
    public static readonly propTypes = SlideGroupPropTypes;

    public render(): React.ReactNode {
        const { initialGroup, groupSize } = this.props;

        return React.Children.map(this.props.children, (child: React.ReactElement<any>, i) => i % groupSize
            ? null
            : (
                <Slide
                    initial={initialGroup && Math.round(i / groupSize) === (initialGroup - 1)}
                    key={i}
                >
                    {React.Children.toArray(this.props.children).slice(i, i + groupSize)}
                </Slide>
            )
        );
    }
}
