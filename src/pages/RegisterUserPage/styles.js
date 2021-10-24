import { makeStyles } from "@material-ui/core/styles";

import theme from "../../styles/customMuiTheme";

export default makeStyles({
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: (isMobile) => (isMobile ? "center" : "space-evenly"),
        alignItems: "center",
        flexDirection: (isMobile) => isMobile && "column",
    },

    leftContainer: {
        display: "flex",
        width: "100%",
        maxWidth: 350,
        height: "100%",
        maxHeight: (isMobile) => (isMobile ? 280 : 350),
        flexDirection: "column",
        justifyContent: "space-between",
    },

    rightContainer: {
        display: "flex",
        width: "100%",
        maxWidth: 350,
        height: "100%",
        maxHeight: (isMobile) => (isMobile ? 450 : 350),
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
    },

    input: {
        marginBottom: 12,
    },

    lastInput: {
        marginBottom: 16,
    },

    textRegister: {
        paddingTop: "8%",
        paddingBottom: "2%",
        fontSize: "36px",
        color: theme.palette.primary.main,
        fontFamily: theme.typography.primary,
    },

    textPlaceholder: {
        paddingTop: "5%",
        fontSize: "18px",
        textDecorationColor: "#737380",
        fontFamily: theme.typography.secondary,
    },

    clickBackLogin: {
        display: "flex",
        fontWeight: "bold",
        alignItems: "center",
        color: theme.palette.primary.main,
        textDecoration: "none",
        marginBottom: "16px",
        marginTop: (isMobile) => isMobile && "15px",
    },
});
