import React from "react";

import { Box, CircularProgress } from "@material-ui/core";

export default function Loader() {
    return (
        <Box
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <CircularProgress color="secondary" />
        </Box>
    );
}
