import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useMediaQuery } from "@material-ui/core";

import { resetCalc } from "../../actions/selectedProductsActions.js";
import { ReactComponent as LeftChevron } from "../../assets/Back.svg";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import theme from "../../styles/customMuiTheme";
import currency from "../../utils/currency";
import styles from "./styles";

function ResultPage() {
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    const testStyles = styles(isMobile);
    const dispatch = useDispatch();
    const result = useSelector((state) => state.selectedProducts.data.result);

    return (
        <div className={testStyles.container}>
            <div className={testStyles.bar}>
                <div
                    className={testStyles.backButton}
                    onClick={() => dispatch(resetCalc())}
                >
                    <LeftChevron />
                    <div className={testStyles.voltar}>Voltar</div>
                </div>
                <Logo width={64} height={64} />
            </div>
            <div className={testStyles.content}>
                <div className={testStyles.title}>
                    {isMobile ? "Distribuição" : "Distribuição de Resultados"}
                </div>
                <div className={testStyles.coin}>
                    R${" "}
                    <div className={testStyles.value}>
                        {currency(result, { symbol: "" }).format()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultPage;
