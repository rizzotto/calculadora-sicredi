import React from "react";

import { makeStyles, useMediaQuery } from "@material-ui/core";
import PropTypes from "prop-types";

import Logo from "../../assets/LogoSicrediLogin.svg";
import LogoMobile from "../../assets/Sicredi.svg";
import theme from "../../styles/customMuiTheme";
import Link from "../Link";

const useStyles = makeStyles({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: 30,
    },
    content: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "100vh",
        flexDirection: "column",
        width: "100%",
        maxWidth: 600,
    },
    text: {
        fontSize: 36,
        color: theme.palette.primary.main,
    },

    textMobile: {
        fontSize: 25,
        color: theme.palette.primary.main,
    },
});

function Forbidden({ role }) {
    const classes = useStyles();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    function handleOnClick() {
        if (role === "associate") {
            return "/";
        } else if (role === "coop") {
            return "/coop";
        } else {
            return "/admin";
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <img
                    alt="Logo"
                    src={isMobile ? LogoMobile : Logo}
                    className={classes.image}
                />
                <h2 className={isMobile ? classes.textMobile : classes.text}>
                    Você não tem acesso a essa página
                </h2>
                <Link color="white" to={handleOnClick}>
                    HOME
                </Link>
            </div>
        </div>
    );
}

Forbidden.propTypes = {
    role: PropTypes.string.isRequired,
};

export default Forbidden;
