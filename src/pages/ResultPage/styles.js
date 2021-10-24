import { makeStyles } from "@material-ui/core/styles";

import theme from "../../styles/customMuiTheme";

export default makeStyles({
    container: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        overflowY: "hidden",
    },
    bar: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        padding: "5px",
    },
    backButton: {
        display: "flex",
        alignItems: "center",
        marginLeft: "15px",
        cursor: "pointer",
    },
    voltar: {
        marginLeft: "5px",
        color: theme.palette.secondary.main,
        transition: "opacity 0.5 ease",
        "&:hover": {
            opacity: "0.8",
        },
    },
    content: (isMobile) => ({
        backgroundColor: theme.palette.background.main,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: isMobile ? "10%" : "3%",
    }),
    title: (isMobile) => ({
        fontSize: isMobile ? "2.5rem" : "3.5rem",
        color: theme.palette.primary.main,
        fontWeight: "bold",
        marginBottom: isMobile ? "40%" : "25%",
        fontFamily: theme.typography.fontFamily,
    }),
    coin: (isMobile) => ({
        display: "flex",
        fontSize: isMobile ? "2.5rem" : "4rem",
        color: theme.palette.primary.main,
        fontWeight: "bold",
        fontFamily: theme.typography.fontFamily,
    }),
    value: (isMobile) => ({
        fontSize: isMobile ? "2.5rem" : "4rem",
        fontWeight: "bold",
        marginLeft: "20px",
        color: theme.palette.quaternary.main,
    }),
});
