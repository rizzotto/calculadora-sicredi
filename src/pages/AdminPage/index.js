import React, { useState } from "react";

import { Grid, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Container from "../../components/Container";
import ListCoop from "./listCoop.js";
import RegisterCoop from "./registerCoop.js";
import Tabs from '../../components/Tabs'

const useStyles = makeStyles({
    container: {
        paddingTop: "32px!important",
    },
    registerCoop: {
        height: "90vh",
        display: "flex",
        justifyContent: "center"
    }
});


export default function CooperativePage() {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        console.log('handle value', newValue)
        setValue(newValue);
    };

    return (
        <div style={{ padding: 8 }}>
            <Grid container spacing={2}>
                <Tabs
                    value={value}
                    onChange={(event) => {
                        setValue(event)
                    }}
                    tabsContent={[
                    <Tab label="Cadastro" index={0} key={0} />,
                    <Tab label="Cooperativas" index={1} key={1} />
                ]} />
                <Grid item xs={12} className={classes.container}>
                    {value === 0 && (
                        <Container className={classes.registerCoop}>
                            <RegisterCoop/>
                        </Container>
                    )}
                    {value === 1 && (
                        <Container>
                            <ListCoop/>
                        </Container>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}
