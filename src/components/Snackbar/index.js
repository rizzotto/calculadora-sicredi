import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Snackbar as MuiSnackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

import { closeSnackbar } from "../../actions/snackbarActions.js";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Snackbar() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.snackbar);

    const { open, message, severity } = state;

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(closeSnackbar());
    };

    return (
        <MuiSnackbar
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            autoHideDuration={5000}
        >
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </MuiSnackbar>
    );
}

Snackbar.propTypes = {
    severity: PropTypes.string,
    open: PropTypes.bool,
    errorMessage: PropTypes.string,
    onClose: PropTypes.func,
};
