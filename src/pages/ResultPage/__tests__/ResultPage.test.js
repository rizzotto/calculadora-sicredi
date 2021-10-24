import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import store from "../../../providers/Store";
import ResultPage from "../index";

it("renders ResultPage correctly", () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <ResultPage />
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
