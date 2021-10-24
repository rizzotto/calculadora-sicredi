import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import store from "../../../providers/Store";
import Dialog from "../index.js";

it("renders Dialog correctly", () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <Dialog />
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
