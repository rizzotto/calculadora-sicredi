import React from "react";

import { Button as MUIButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import theme from "../../styles/customMuiTheme";

const useStyles = makeStyles({
    darkGreen: {
        backgroundColor: "#026C43",
        transition: "opacity 0.3s ease",
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            opacity: 0.98,
        },
    },
    lightGreen: {
        backgroundColor: theme.palette.quaternary.main,
        "&:hover": {
            backgroundColor: theme.palette.quaternary.main,
            opacity: 0.98,
        },
    },
    content: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        height: 56,
        borderRadius: 8,
    },
});

export default function Button({ color, onClick, children, ...rest }) {
    const classes = useStyles();
    const getColor = () => {
        if (color === "dark") {
            return classes.darkGreen;
        } else {
            return classes.lightGreen;
        }
    };

    return (
        <MUIButton
            className={`${getColor()} ${classes.content}`}
            variant="contained"
            color="primary"
            onClick={onClick}
            {...rest}
        >
            {children}
        </MUIButton>
    );
}
Button.propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.string.isRequired,
};
