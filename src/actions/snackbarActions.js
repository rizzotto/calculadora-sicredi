import { types } from "../reducers/types";

export const openSnackbar = ({ message, severity }) => (dispatch) => {
    dispatch({
        type: types.OPEN_SNACKBAR,
        open: true,
        message,
        severity,
    });
};

export const closeSnackbar = () => (dispatch) => {
    dispatch({
        type: types.CLOSE_SNACKBAR,
    });
};
