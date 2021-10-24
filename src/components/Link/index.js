import React from "react";
import { Link as RRLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import theme from "../../styles/customMuiTheme.js";

const useStyles = makeStyles({
    link: {
        color: theme.palette.primary.main,
        fontSize: 18,
        fontWeight: 800,
        textDecoration: "none",
    },
    white: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: 800,
        textDecoration: "none",
        backgroundColor: theme.palette.quaternary.main,
        width: "100%",
        maxWidth: 500,
        height: 56,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            backgroundColor: theme.palette.quaternary.main,
            opacity: 0.9,
        },
    },
});

export default function Link({ children, to, color }) {
    const classes = useStyles();

    return (
        <RRLink
            to={to}
            className={color === "white" ? classes.white : classes.link}
        >
            {children}
        </RRLink>
    );
}
Link.propTypes = {
    children: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    color: PropTypes.string,
};
