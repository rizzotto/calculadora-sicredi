import React from "react";

import { Container, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles({
    container: {
        flex: 1,
        alignItems: "center",
        display: "flex",
    },
});

function ContainerComponent({ children, ...rest }) {
    const classes = useStyles();

    return (
        <Container className={classes.container} maxWidth="xl" {...rest}>
            {children}
        </Container>
    );
}
ContainerComponent.propTypes = {
    children: PropTypes.element.isRequired,
};

export default ContainerComponent;
