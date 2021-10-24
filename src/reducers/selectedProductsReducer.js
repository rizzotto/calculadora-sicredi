import { types } from "./types.js";

const initialState = {
    error: false,
    loading: false,
    data: {
        products: [],
        result: "",
    },
};

export const selectedProductsReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.PUSH_TO_SHEET:
            return {
                ...state,
                data: {
                    ...state.data,
                    products: [...state.data.products, action.value],
                },
            };
        case types.POP_FROM_SHEET:
            const data = [...state.data.products];
            data.splice(data.indexOf(action.value), 1);
            return {
                ...state,
                data: {
                    ...state.data,
                    products: data,
                },
            };
        case types.UPDATE_PRODUCT:
            let update = [...state.data.products];
            const index = action.value.oldData.tableData.id;
            update[index] = action.value.newData;
            return {
                ...state,
                data: {
                    ...state.data,
                    products: update,
                },
            };
        case types.START_CALCULATE:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case types.FINISH_CALCULATE:
            return {
                ...state,
                loading: false,
                error: false,
                data: {
                    ...state.data,
                    result: action.value,
                },
            };
        case types.ERROR_CALCULATE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case types.RESET_CALC:
            return {
                ...state,
                data: {
                    ...state.data,
                    result: "",
                },
            };
        default:
            return { ...state };
    }
};
