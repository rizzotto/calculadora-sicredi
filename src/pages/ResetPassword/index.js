import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Grid, makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

import { openSnackbar } from "../../actions/snackbarActions.js";
import { ReactComponent as Logo } from "../../assets/LogoSicrediLogin.svg";
import { ReactComponent as LogoMobile } from "../../assets/Sicredi.svg";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Input from "../../components/Input";
import api from "../../services/api.js";
import theme from "../../styles/customMuiTheme.js";

const useStyles = makeStyles({
    container: {
        flex: 1,
        height: "100vh",
    },
    text: {
        fontSize: 36,
        color: theme.palette.primary.main,
    },
});

function ResetPassword() {
    const classes = useStyles();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const history = useHistory();
    const dispatch = useDispatch();

    const validation = yup.object().shape({
        document: yup
            .string()
            .required("Você precisa preencher um número de documento"),
        newPassword: yup
            .string()
            .required("Você precisa preencher o campo de nova senha"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("newPassword"), null], "Senhas não conferem "),
    });

    const handleSubmit = async ({ values }) => {
        try {
            await api.post("/login/forgot-password", {
                ...values,
            });
            dispatch(
                openSnackbar({
                    message: "Senha alterada com sucesso!",
                    severity: "success",
                })
            );
            history.push("/");
        } catch (e) {
            dispatch(
                openSnackbar({
                    message: "Falha ao alterar a senha. Tente novamente",
                    severity: "error",
                })
            );
        }
    };

    return (
        <Container maxWidth="sm">
            <Formik
                initialValues={{
                    document: "",
                    newPassword: "",
                    confirmPassword: "",
                }}
                validationSchema={validation}
                onSubmit={async (values) => {
                    await handleSubmit({ values });
                }}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form>
                        <Grid
                            container
                            className={classes.container}
                            justify="center"
                            alignItems="center"
                        >
                            <Grid
                                container
                                item
                                justify="center"
                                spacing={2}
                                xs={12}
                            >
                                <Grid
                                    xs={12}
                                    item
                                    style={{ paddingBottom: 50 }}
                                >
                                    {isMobile ? <LogoMobile /> : <Logo />}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={classes.text}>
                                        Digite seu número de documento
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="document"
                                        as={Input}
                                        placeholder="CPF ou código de cooperativa"
                                        error={
                                            !!(
                                                touched.document &&
                                                errors.document
                                            )
                                        }
                                        helperText={
                                            touched.document && errors.document
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography className={classes.text}>
                                        Digite sua nova senha
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="newPassword"
                                        as={Input}
                                        placeholder="Nova senha"
                                        type="password"
                                        error={
                                            !!(
                                                touched.newPassword &&
                                                errors.newPassword
                                            )
                                        }
                                        helperText={
                                            touched.newPassword &&
                                            errors.newPassword
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography className={classes.text}>
                                        Confirme sua nova senha
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="confirmPassword"
                                        as={Input}
                                        placeholder="Repita sua nova senha"
                                        type="password"
                                        error={
                                            !!(
                                                touched.confirmPassword &&
                                                errors.confirmPassword
                                            )
                                        }
                                        helperText={
                                            touched.confirmPassword &&
                                            errors.confirmPassword
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        disabled={isSubmitting}
                                        type="submit"
                                    >
                                        Alterar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export default ResetPassword;
