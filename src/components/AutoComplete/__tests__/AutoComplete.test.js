import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import store from "../../../providers/Store";
import AutoComplete from "../index.js";

it("renders AutoComplete correctly", () => {
    const options = [
        {
            name: "Consorcio",
            value: "12",
        },
    ];
    const tree = renderer
        .create(
            <Provider store={store}>
                <AutoComplete
                    onChange={() => console.log("onChange")}
                    options={options}
                />
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
