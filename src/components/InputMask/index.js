import React from "react";
import ReactInputMask from "react-input-mask";

import PropTypes from "prop-types";

import Input from "../Input";

export default function InputMask({
    mask,
    onChange,
    value,
    onBlur,
    ...others
}) {
    return (
        <ReactInputMask
            mask={mask}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            maskplaceholder=""
        >
            {(inputProps) => <Input {...inputProps} {...others} />}
        </ReactInputMask>
    );
}

InputMask.propTypes = {
    mask: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
};
