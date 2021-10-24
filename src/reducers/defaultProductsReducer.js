import { types } from "./types.js";

const initialState = {
    loading: true,
    error: false,
    data: [],
};

export const defaultProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_GET_PRODUCTS:
            return {
                ...state,
                error: false,
                loading: true,
            };
        case types.FINISH_GET_PRODUCTS:
            return {
                ...state,
                error: false,
                loading: false,
                data: action.value,
            };
        case types.ERROR_GET_PRODUCTS:
            return {
                ...state,
                error: true,
                loading: false,
            };
        default:
            return { ...state };
    }
};
