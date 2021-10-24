import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

import { Typography } from "@material-ui/core";

import Link from "../index.js";

it("renders link correctly", () => {
    const tree = renderer
        .create(
            <Router>
                <Link to={"/test"}>
                    <Typography>{"teste"}</Typography>
                </Link>
            </Router>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
