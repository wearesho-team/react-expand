import * as React from "react";

export interface ExpandControlProps extends React.HTMLProps<HTMLButtonElement> {
    ref?: any; // https://github.com/Microsoft/TypeScript/issues/16019
    state?: any;
    expandId: string;
    staticState?: boolean;
    activeOnMount?: boolean;
    activeClassName?: string;
    triggerEvent?: "hover" | "click";
}

export const ExpandControlDefaultProps: {[T in keyof ExpandControlProps]?: ExpandControlProps[T]} = {
    activeClassName: "active-control",
    triggerEvent: "click"
};
