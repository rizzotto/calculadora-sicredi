import React from "react";
import { Provider } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import Dialog from "./components/Dialog";
import Snackbar from "./components/Snackbar";
import store from "./providers/Store.js";
import { Routes } from "./routes";
import theme from "./styles/customMuiTheme.js";

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes />
                <Dialog />
                <Snackbar />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
