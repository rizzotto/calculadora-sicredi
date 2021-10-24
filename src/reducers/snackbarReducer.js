import { types } from "./types";

const initialState = {
    open: false,
    message: "",
    severity: "",
};

export const snackbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.OPEN_SNACKBAR:
            return {
                ...state,
                open: action.open,
                message: action.message,
                severity: action.severity,
            };
        case types.CLOSE_SNACKBAR:
            return {
                ...state,
                open: false,
            };
        default:
            return { ...state };
    }
};

export default snackbarReducer;
