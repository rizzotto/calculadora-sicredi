import React from "react";
import { useDispatch } from "react-redux";

import {
    Container,
    Fab,
    Grid,
    Typography,
    useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add.js";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";

import { closeDialog, openDialog } from "../../actions/dialogActions.js";
import { openSnackbar } from "../../actions/snackbarActions.js";
import Button from "../../components/Button";
import CooperativeAutoComplete from "../../components/CooperativeAutoComplete";
import Input from "../../components/Input";
import Table from "../../components/Table";
import useApiRequest from "../../hooks/useApiRequest.js";
import api from "../../services/api.js";
import theme from "../../styles/customMuiTheme.js";
import getToken from "../../utils/getToken.js";

const AddProductSchema = Yup.object().shape({
    prod: Yup.object()
        .shape({
            idProd: Yup.string().required("Um produto deve ser selecionado"),
            name: Yup.string().required("Um produto deve ser selecionado"),
        })
        .required("Um produto deve ser selecionado"),
    value: Yup.number().required("Você deve digitar um valor"),
    weight: Yup.number().required("Você deve digitar um peso para o produto"),
});

const useStyles = makeStyles({
    container: {
        padding: 24,
    },
    title: {
        maxWidth: 1044,
    },
    titleLarge: {
        maxWidth: 1044,
        paddingLeft: "0 !important",
        paddingRight: "0 !important",
    },
    productTitle: {
        fontSize: 36,
        color: theme.palette.primary.main,
    },
    addButton: {
        backgroundColor: theme.palette.quaternary.main,
        transition: "opacity 0.3s ease",

        "&:hover": {
            backgroundColor: theme.palette.quaternary.main,
            opacity: "0.90",
        },
    },
    addIcon: {
        fill: "#FFF",
    },
    tabs: {
        "&:.MuiTabs-scroller": {
            backgroundColor: "#fff",
        },
    },
});

const columns = [
    { title: "Nome", field: "name", editable: "never" },
    { title: "Valor", field: "value", editable: "onUpdate" },
    { title: "Peso", field: "weight", editable: "onUpdate" },
    { title: "Categoria", field: "categoryName", editable: "never" },
];

function DialogContent({ reload }) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleSubmit = async ({ values }) => {
        try {
            await api.post("/product/add", {
                idProd: values.prod.idProd,
                value: values.value,
                weight: values.weight,
            });
            await reload();
            dispatch(
                openSnackbar({
                    message: "Produto adicionado!",
                    severity: "success",
                })
            );
            dispatch(closeDialog());
        } catch (e) {
            dispatch(
                openSnackbar({
                    message: e.response.data,
                    severity: "error",
                })
            );
        }
    };

    return (
        <Container maxWidth="xs" className={classes.container}>
            <Formik
                initialValues={{
                    prod: {
                        id: "",
                        name: "",
                    },
                    value: "",
                    weight: "",
                }}
                validationSchema={AddProductSchema}
                onSubmit={async (values) => {
                    await handleSubmit({ values });
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Grid container justify="center" spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    component={CooperativeAutoComplete}
                                    error={!!(touched.prod && errors.prod)}
                                    touched={touched.prod && errors.prod}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    as={Input}
                                    label="Valor"
                                    name="value"
                                    type="number"
                                    error={!!(touched.value && errors.value)}
                                    helperText={touched.value && errors.value}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    as={Input}
                                    label="Peso"
                                    name="weight"
                                    type="number"
                                    error={!!(touched.weight && errors.weight)}
                                    helperText={touched.weight && errors.weight}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    type="submit"
                                    style={{ marginTop: 12 }}
                                >
                                    Cadastrar
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}
DialogContent.propTypes = {
    reload: PropTypes.func.isRequired,
};

export default function AddNewProduct() {
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    const isLarge = useMediaQuery(theme.breakpoints.up("md"));
    const classes = useStyles({ isLarge });
    const { data: cooperativeProducts, loading, error, reload } = useApiRequest(
        true,
        `/product/${getToken().coop}`
    );

    const dispatch = useDispatch();

    const handleFabClick = () => {
        dispatch(openDialog({ content: <DialogContent reload={reload} /> }));
    };

    // TODO: Add handle delete to api request
    /*const handleDelete = (oldData) => {
        return new Promise(async (resolve) => {
        await api.delete();
            await reload();
            resolve();
        });
    };*/

    const handleUpdate = (newData, oldData) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (newData) {
                    await api.put("/product/edit", {
                        idProd: newData.idProd,
                        value: newData.value,
                        weight: newData.weight,
                    });
                    await reload();
                }
                resolve();
            } catch (e) {
                reject();
            }
        });
    };

    if (error) {
        return <Typography>Falha ao consultar produtos</Typography>;
    }

    return (
        <Grid
            spacing={isMobile ? 6 : 8}
            container
            justify="center"
            alignItems="center"
        >
            <Grid
                item
                xs={12}
                container
                className={isLarge ? classes.titleLarge : classes.title}
            >
                <Grid item xs={6}>
                    <Typography className={classes.productTitle}>
                        Produtos
                    </Typography>
                </Grid>
                <Grid item container xs={6} justify="flex-end">
                    <Fab
                        aria-label="add"
                        onClick={() => handleFabClick()}
                        className={classes.addButton}
                    >
                        <AddIcon className={classes.addIcon} />
                    </Fab>
                </Grid>
            </Grid>
            <Grid item xs={12} container justify="center">
                <Table
                    columns={columns}
                    data={cooperativeProducts}
                    title="Produtos"
                    style={isMobile ? { width: 310 } : {}}
                    update={handleUpdate}
                    isLoading={loading}
                />
            </Grid>
        </Grid>
    );
}
