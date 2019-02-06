import * as React from "react";

export interface ControlledExpandElementProps extends React.HTMLProps<HTMLDivElement> {
    ref?: any; // https://github.com/Microsoft/TypeScript/issues/16019
    expandId: string;
    closeOnOutside?: boolean;
}
