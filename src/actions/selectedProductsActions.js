import { openSnackbar } from "../actions/snackbarActions.js";
import { types } from "../reducers/types.js";
import api from "../services/api";

export const addProduct = (product) => (dispatch) => {
    dispatch({ type: types.PUSH_TO_SHEET, value: product });
};

export const calculate = (selectedProducts) => async (dispatch) => {
    try {
        dispatch({ type: types.START_CALCULATE });
        const newSelectProducts = selectedProducts.map((p) => {
            return {
                id: p.idProd,
                value: p.value,
            };
        });
        const response = await api.post(
            "/associate/calculate-result",
            newSelectProducts
        );
        dispatch({ type: types.FINISH_CALCULATE, value: response.data });
    } catch (e) {
        dispatch(
            openSnackbar({
                message: e.response.data.message,
                severity: "error",
            })
        );
    }
};

export const removeProduct = (id) => (dispatch) => {
    dispatch({ type: types.POP_FROM_SHEET, value: id });
};

export const updateProduct = (oldData, newData) => (dispatch) => {
    dispatch({ type: types.UPDATE_PRODUCT, value: { oldData, newData } });
};

export const resetCalc = () => (dispatch) => {
    dispatch({ type: types.RESET_CALC });
};
