import React from "react";
import renderer from "react-test-renderer";

import InputMask from "../index.js";

it("renders InputMask correctly", () => {
    const tree = renderer.create(<InputMask />).toJSON();
    expect(tree).toMatchSnapshot();
});
