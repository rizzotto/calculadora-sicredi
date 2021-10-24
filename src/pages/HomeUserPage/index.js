import React from "react";
import { useSelector } from "react-redux";

import { ProductsUserPage } from "../ProductsUserPage";
import ResultPage from "../ResultPage";

export default function Home() {
    const state = useSelector((state) => state.selectedProducts.data.result);

    if (!state) {
        return <ProductsUserPage />;
    } else {
        return <ResultPage />;
    }
}
