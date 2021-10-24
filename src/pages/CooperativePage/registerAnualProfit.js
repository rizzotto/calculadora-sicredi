import React from "react";
import { useDispatch } from "react-redux";

import { Box, Grid, InputAdornment, Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Formik, Field, useFormikContext } from "formik";
import moment from "moment";
import * as yup from "yup";

import { openSnackbar } from "../../actions/snackbarActions.js";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import SimpleTable from "../../components/SimpleTable";
import useApiRequest from "../../hooks/useApiRequest.js";
import api from "../../services/api.js";
import theme from "../../styles/customMuiTheme.js";

const useStyles = makeStyles({
    container: {
        maxWidth: 1344,
    },
    containerLeft: {
        height: "100%",
        maxWidth: 448,
    },
    div: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
    },
    form: {
        height: "100%",
        maxWidth: 448,
        width: "100%",
    },
    items: {
        marginTop: "10%",
    },
    productTitle: {
        fontSize: 36,
        color: theme.palette.primary.main,
    },
    table: {
        maxWidth: 448,
    },
});

const YearSelect = () => {
    const { values, setFieldValue } = useFormikContext();

    const years = () => {
        const yearsArray = [];
        for (
            let i = moment();
            moment(i).isAfter(moment().subtract(10, "year"));
            i = moment(i).subtract(1, "year")
        ) {
            yearsArray.push(moment(i).year());
        }
        return yearsArray;
    };

    const handleChange = (event) => {
        setFieldValue("year", event.target.value.toString(), true);
    };

    return (
        <Input
            value={values.year}
            onChange={handleChange}
            select
            fullWidth
            label="Ano"
        >
            {years().map((y) => (
                <MenuItem value={y} key={y}>
                    {y}
                </MenuItem>
            ))}
        </Input>
    );
};

const YearResult = () => {
    const { values, setFieldValue } = useFormikContext();

    const handleChange = (event) => {
        setFieldValue("result", event.target.value, true);
    };

    return (
        <Input
            value={values.result}
            onChange={handleChange}
            fullWidth
            label="Resultado"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                ),
            }}
        />
    );
};

export default function RegisterAnualProfit() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { data: pastYears, loading, error, reload } = useApiRequest(
        true,
        "/anualResult/findAnualResult"
    );

    const validationSchema = yup.object().shape({
        year: yup.string().required("Você deve escolher um ano"),
        result: yup.string().required("Você deve digitar um valor"),
    });

    const handleSubmit = async ({ values, resetForm }) => {
        try {
            await api.post("/anualResult/addAnualResult", {
                ...values,
            });
            dispatch(
                openSnackbar({
                    message: "Resultado registrado com sucesso!",
                    severity: "success",
                })
            );
            await reload();
            resetForm();
        } catch (e) {
            dispatch(
                openSnackbar({
                    message: "Falha ao registrar o resultado",
                    severity: "error",
                })
            );
        }
    };

    const handleDelete = async ({ year }) => {
        try {
            await api.delete(`/anualResult/${year}`);
            dispatch(
                openSnackbar({
                    message: "Resultado apagado com sucesso!",
                    severity: "success",
                })
            );
            await reload();
        } catch (e) {
            dispatch(
                openSnackbar({
                    message: "Falha ao apagar o resultado",
                    severity: "error",
                })
            );
        }
    };

    return (
        <div className={classes.div}>
            <Grid container className={classes.container}>
                <Grid item xs={12}>
                    <Typography className={classes.productTitle}>
                        Cadastrar Resultado Anual
                    </Typography>
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    justify="space-between"
                    alignItems="center"
                    className={classes.items}
                >
                    <Formik
                        initialValues={{ year: "", result: "" }}
                        onSubmit={(values, { resetForm }) =>
                            handleSubmit({ values, resetForm })
                        }
                        validationSchema={validationSchema}
                    >
                        <Form className={classes.form}>
                            <Grid
                                item
                                container
                                xs={12}
                                md={6}
                                alignContent="space-around"
                                className={classes.containerLeft}
                                justify="space-between"
                            >
                                <Grid item xs={5}>
                                    <Field name="year" component={YearSelect} />
                                </Grid>
                                <Grid item xs={5}>
                                    <Field
                                        component={YearResult}
                                        name="result"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth type="submit">
                                        Cadastrar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        container
                        justify="flex-end"
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <Typography style={{ fontSize: 22 }}>
                                Resultados anteriores
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {loading ? (
                                <Box display="flex" minHeight={290}>
                                    <Loader />
                                </Box>
                            ) : (
                                <Box display="flex" minHeight={290}>
                                    {error ? (
                                        <Typography>
                                            Erro ao baixar os resultados
                                            anteriores
                                        </Typography>
                                    ) : (
                                        <SimpleTable
                                            rows={pastYears}
                                            className={classes.table}
                                            handleDelete={handleDelete}
                                        />
                                    )}
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
