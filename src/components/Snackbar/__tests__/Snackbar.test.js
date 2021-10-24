import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import store from "../../../providers/Store.js";
import Snackbar from "../index.js";

it("renders Snackbar correctly", () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <Snackbar />
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
