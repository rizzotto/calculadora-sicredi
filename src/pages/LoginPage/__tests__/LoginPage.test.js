import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

import store from "../../../providers/Store";
import LoginPage from "../index";

jest.mock("../../../assets/Lock.svg", () => {
    return {
        A: true,
        B: () => {
            return <></>;
        },
    };
});

jest.mock("../../../assets/In.svg", () => {
    return {
        A: true,
        B: () => {
            return <></>;
        },
    };
});

jest.mock("../../../assets/LogoSicrediLogin.svg", () => {
    return {
        A: true,
        B: () => {
            return <></>;
        },
    };
});

it("renders LoginPage correctly", () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <Router>
                    <LoginPage />
                </Router>
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
