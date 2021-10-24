import React from "react";
import renderer from "react-test-renderer";

import Input from "../index.js";

it("renders Input correctly", () => {
    const tree = renderer
        .create(
            <Input onChange={() => console.log("onChange")} value="onChange" />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
