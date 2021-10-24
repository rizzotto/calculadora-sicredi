import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import PropTypes from "prop-types";

import { getProducts } from "../../actions/defaultProductsActions.js";
import {
    closeDialog,
    openDialog,
    updateState,
} from "../../actions/dialogActions.js";
import { addProduct } from "../../actions/selectedProductsActions.js";
import Input from "../Input";

const useStyles = makeStyles({
    paper: {
        borderRadius: 8,
        minHeight: 250,
    },
    root: {
        alignItems: "center",
        display: "flex",
    },
});

function ButtonActions() {
    const { value, product } = useSelector((state) => state.dialog.state);
    const dispatch = useDispatch();

    const addToSheet = () => {
        dispatch(addProduct({ ...product, value }));
        dispatch(closeDialog());
    };

    return (
        <>
            <Button color="primary" onClick={() => dispatch(closeDialog())}>
                Cancelar
            </Button>
            <Button color="secondary" onClick={() => addToSheet()}>
                Confirmar
            </Button>
        </>
    );
}

function Content() {
    const { value } = useSelector((state) => state.dialog.state);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(
            updateState({
                value: event.target.value,
            })
        );
    };

    return (
        <Grid container alignItems="center">
            <Grid item xs={12} container justify="center">
                <Input
                    placeholder="Insira o valor"
                    onChange={handleChange}
                    type="number"
                    value={value}
                />
            </Grid>
        </Grid>
    );
}

export default function AutoComplete({ ...rest }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const { data: options, loading } = useSelector(
        (state) => state.defaultProducts
    );

    useEffect(() => {
        dispatch(getProducts());
        //eslint-disable-next-line
    }, []);

    const handleChange = (event, value) => {
        if (value) {
            dispatch(
                openDialog({
                    title: <Typography>{value.name}</Typography>,
                    content: <Content />,
                    actions: <ButtonActions />,
                    state: { value: "", product: value },
                    options: {
                        fullWidth: true,
                        maxWidth: "xs",
                        classes: { paper: classes.paper },
                    },
                    styleContent: {
                        classes: { root: classes.root },
                    },
                })
            );
        }
    };

    return (
        <Autocomplete
            open={open}
            id="autocomplete"
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            options={options}
            loading={loading}
            getOptionLabel={(option) => option.name}
            onChange={handleChange}
            noOptionsText="Nenhuma opção"
            renderInput={(params) => (
                <TextField {...params} label="Produtos" variant="outlined" />
            )}
            {...rest}
        />
    );
}

Button.propTypes = {
    onChange: PropTypes.element,
};
