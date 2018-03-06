import * as React from "react";
import * as PropTypes from "prop-types";

export interface PopupProps extends React.HTMLProps<HTMLDivElement> {
    popupId: string;
}

export const PopupPropTypes: {[T in keyof PopupProps]: PropTypes.Validator<any>} = {
    popupId: PropTypes.string.isRequired,
};
