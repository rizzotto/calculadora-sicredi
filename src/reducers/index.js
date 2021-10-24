import { combineReducers } from "redux";

import { defaultProductsReducer } from "./defaultProductsReducer.js";
import { dialogReducer } from "./dialogReducer.js";
import { selectedProductsReducers } from "./selectedProductsReducer.js";
import snackbarReducer from "./snackbarReducer.js";

const rootReducers = combineReducers({
    defaultProducts: defaultProductsReducer,
    dialog: dialogReducer,
    selectedProducts: selectedProductsReducers,
    snackbar: snackbarReducer,
});

export default rootReducers;
