import { types } from "../reducers/types";

export const openDialog = ({ ...options }) => (dispatch) => {
    dispatch({
        type: types.OPEN_DIALOG,
        value: options,
    });
};

export const closeDialog = () => (dispatch) => {
    dispatch({
        type: types.CLOSE_DIALOG,
    });
};

export const updateState = ({ ...state }) => (dispatch) => {
    dispatch({
        type: types.SET_DIALOG_STATE,
        value: state,
    });
};
