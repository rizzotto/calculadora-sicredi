import React from "react";
import renderer from "react-test-renderer";

import { Typography } from "@material-ui/core";

import Button from "../index.js";

it("renders button correctly", () => {
    const tree = renderer
        .create(
            <Button>
                <Typography>Test</Typography>
            </Button>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
