import { types } from "./types";

const initialState = {
    open: false,
};

export const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.OPEN_DIALOG:
            return {
                open: true,
                ...action.value,
            };
        case types.CLOSE_DIALOG:
            return {
                ...state,
                open: false,
            };
        case types.SET_DIALOG_STATE:
            return {
                ...state,
                state: {
                    ...state.state,
                    ...action.value,
                },
            };
        default:
            return { ...state };
    }
};
