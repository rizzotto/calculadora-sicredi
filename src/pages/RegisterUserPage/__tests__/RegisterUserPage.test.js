import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

import store from "../../../providers/Store";
import RegisterPage from "../index";

it("renders RegisterPage correctly", () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <Router>
                    <RegisterPage />
                </Router>
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
