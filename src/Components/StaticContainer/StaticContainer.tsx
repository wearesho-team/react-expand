import * as React from "react";

export class StaticContainer extends React.Component {
    public static children: React.ReactNode = null;
    public static childrenLength: number = 0;

    public static renderStatic(): React.ReactNode {
        const children = StaticContainer.children;
        StaticContainer.children = null;
        return children;
    }

    public render(): null {
        StaticContainer.children = this.props.children;
        StaticContainer.childrenLength = React.Children.count(this.props.children);
        return null;
    }

}
