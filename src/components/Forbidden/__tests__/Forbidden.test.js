import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

import Forbidden from "../index.js";

it("renders Forbidden correctly", () => {
    const tree = renderer
        .create(
            <Router>
                <Forbidden />
            </Router>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
