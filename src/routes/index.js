import React from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
    useLocation,
} from "react-router-dom";

import { makeStyles, useMediaQuery } from "@material-ui/core";
import jwt from "jsonwebtoken";
import PropTypes from "prop-types";

import Forbidden from "../components/Forbidden";
import AdminPage from "../pages/AdminPage";
import CooperativePage from "../pages/CooperativePage";
import ResetPassword from "../pages/ResetPassword";
import Home from "../pages/HomeUserPage";
import Login from "../pages/LoginPage";
import RegisterUserPage from "../pages/RegisterUserPage";
import theme from "../styles/customMuiTheme";
import { isAuthenticated } from "../utils/authentication.js";

const useStyles = makeStyles({
    root: {
        display: "flex",
    },
    content: {
        flexGrow: 1,
    },
    background: {
        background: `url(${require("../assets/Background.svg")})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
    },
    backgroundMobile: {
        background: `url(${require("../assets/BackgroundMobile.svg")})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
    },
});

const AssociateRoute = ({ children, ...rest }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();
    const classes = useStyles(isMobile);

    if (!isAuthenticated()) {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { from: location.pathname + location.search },
                }}
            />
        );
    }

    const token = window.localStorage.getItem("token");
    const decodedToken = jwt.decode(token);
    if (decodedToken.role !== "associate") {
        return <Forbidden role={decodedToken.role} />;
    } else {
        return (
            <div
                className={
                    isMobile ? classes.backgroundMobile : classes.background
                }
            >
                <Route {...rest}>{children}</Route>
            </div>
        );
    }
};

const CooperativeRoute = ({ children, ...rest }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();
    const classes = useStyles(isMobile);

    if (!isAuthenticated()) {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { from: location.pathname + location.search },
                }}
            />
        );
    }

    const token = window.localStorage.getItem("token");
    const decodedToken = jwt.decode(token);

    if (decodedToken.role !== "coop") {
        return <Forbidden role={decodedToken.role} />;
    } else {
        return (
            <div
                className={
                    isMobile ? classes.backgroundMobile : classes.background
                }
            >
                <Route {...rest}>{children}</Route>
            </div>
        );
    }
};
const AdminRoute = ({ children, ...rest }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();
    const classes = useStyles(isMobile);

    if (!isAuthenticated()) {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { from: location.pathname + location.search },
                }}
            />
        );
    }

    const token = window.localStorage.getItem("token");
    const decodedToken = jwt.decode(token);
    if (decodedToken.role !== "admin") {
        return <Forbidden role={decodedToken.role} />;
    } else {
        return (
            <div
                className={
                    isMobile ? classes.backgroundMobile : classes.background
                }
            >
                <Route {...rest}>{children}</Route>
            </div>
        );
    }
};

export const Routes = () => {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <main className={classes.content}>
                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/forgot-password">
                            <ResetPassword />
                        </Route>
                        <Route path="/register">
                            <RegisterUserPage />
                        </Route>
                        <AdminRoute path="/admin">
                            <AdminPage />
                        </AdminRoute>
                        <CooperativeRoute path="/coop">
                            <CooperativePage />
                        </CooperativeRoute>
                        <AssociateRoute path="/">
                            <Home />
                        </AssociateRoute>
                    </Switch>
                </main>
            </div>
        </Router>
    );
};

AssociateRoute.propTypes = {
    children: PropTypes.element.isRequired,
};

CooperativeRoute.propTypes = {
    children: PropTypes.element.isRequired,
};

AdminRoute.propTypes = {
    children: PropTypes.element.isRequired,
};
