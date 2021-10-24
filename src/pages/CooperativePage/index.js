import React, { useState } from "react";

import { Grid, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Container from "../../components/Container";
import AddNewProduct from "./addNewProduct.js";
import RegisterAnualProfit from "./registerAnualProfit.js";

import Tabs from '../../components/Tabs'

const useStyles = makeStyles({
    container: {
        paddingTop: "32px!important",
    },
});

export default function CooperativePage() {
    const classes = useStyles();
    const [value, setValue] = useState(0);


    return (
        <div style={{ padding: 8 }}>
            <Grid container spacing={2}>
                {/*<Grid*/}
                {/*    item*/}
                {/*    xs={12}*/}
                {/*    style={{ backgroundColor: "#FFFFFF", paddingBottom: 0 }}*/}
                {/*>*/}
                {/*    <Tabs value={value} onChange={handleChange}>*/}
                {/*        <Tab label="Produto" index={0} />*/}
                {/*        <Tab label="Lucro" index={1} />*/}
                {/*    </Tabs>*/}
                {/*</Grid>*/}
                <Tabs
                    value={value}
                    onChange={(event) => {
                        setValue(event)
                    }}
                    tabsContent={[
                    <Tab label="Produto" index={0} key={0} />,
                    <Tab label="Lucro" index={1} key={1} />
                ]} />
                <Grid item xs={12} className={classes.container}>
                    {value === 0 && (
                        <Container>
                            <AddNewProduct />
                        </Container>
                    )}
                    {value === 1 && (
                        <Container>
                            <RegisterAnualProfit />
                        </Container>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}
