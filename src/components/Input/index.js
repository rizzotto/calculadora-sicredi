import React from "react";

import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles({
    root: {
        width: "100%",

        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderRadius: 8,
            },
        },
    },
});

export default function Input({ placeholder, onChange, value, ...rest }) {
    const classes = useStyles();

    return (
        <TextField
            classes={{ root: classes.root }}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            variant="outlined"
            {...rest}
        />
    );
}
Input.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
};
