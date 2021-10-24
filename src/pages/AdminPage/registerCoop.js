import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { useMediaQuery } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import jwt from "jsonwebtoken";
import * as Yup from "yup";

import { openSnackbar } from "../../actions/snackbarActions.js";
import Sicredi from "../../assets/Sicredi.svg";
import Button from "../../components/Button";
import Input from "../../components/Input";
import InputMask from "../../components/InputMask";
import api from "../../services/api";
import theme from "../../styles/customMuiTheme";
import testCnpj from "../../utils/testCnpj";
import Styles from "./styles";

export default function RegisterCoop() {
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    const pageStyles = Styles(isMobile);
    const history = useHistory();
    const dispatch = useDispatch();

    function handleRoute(role) {
        if (role === "associate") {
            return "/";
        } else if (role === "coop") {
            return "/coop";
        } else {
            return "/admin";
        }
    }

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(1, "Muito curto!")
            .max(50, "Muito Longo!")
            .required("Campo Obrigatório"),
        cnpj: Yup.string().test("cnpj", "CNPJ Inválido", (value) =>
            testCnpj(value)
        ),
        password: Yup.string()
            .matches(
                "(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*",
                "Pelo menos 6 alfanuméricos contendo letras minúsculas e maiúsculas"
            )
            .required("Campo Obrigatório"),
        coopCode: Yup.string()
            .typeError("Apenas números")
            .min(4, "Deve conter 4 números")
            .max(4, "Deve conter 4 números")
            .required("Campo Obrigatório"),
    });

    async function handleOnSubmit(values) {
        const cnpjNumbers = values.cnpj.replace(/[^0-9]/g, "");
        await api
            // Atualizar post com a rota correta
            .post("/login/register-cooperative", {
                name: values.name,
                codCoop: values.coopCode,
                document: cnpjNumbers,
                password: values.password,
            })
            .then((response) => {
                const token = response.headers.authorization;
                localStorage.setItem("token", token.split(" ")[1]);
                const decodedToken = jwt.decode(token.split(" ")[1]);

                history.push(handleRoute(decodedToken.role));
            })
            .catch((e) => {
                dispatch(
                    openSnackbar({
                        message: "Falha ao registrar cooperativa",
                        severity: "error",
                    })
                );
            });
    }

    return (
        <div className={pageStyles.container}>
            <div className={pageStyles.leftContainer}>
                <div className={pageStyles.title}>
                    <img alt="Sicredi Logo" src={Sicredi} />
                    <div className={pageStyles.textRegister}>Cadastro</div>
                    <div className={pageStyles.textPlaceholder}>
                        Realize o cadastro das cooperativas aqui.
                    </div>
                </div>
            </div>
            <div className={pageStyles.rightContainer}>
                <Formik
                    initialValues={{
                        name: "",
                        cnpj: "",
                        password: "",
                        coopCode: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async (values) => {
                        await handleOnSubmit(values);
                    }}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <Field
                                className={pageStyles.input}
                                error={!!(touched.name && errors.name)}
                                helperText={touched.name && errors.name}
                                name="name"
                                label="Nome Cooperativa"
                                as={Input}
                            />
                            <Field
                                className={pageStyles.input}
                                helperText={touched.cnpj && errors.cnpj}
                                error={!!(touched.cnpj && errors.cnpj)}
                                name="cnpj"
                                label="CNPJ"
                                mask={"99.999.999/9999-99"}
                                as={InputMask}
                            />
                            <Field
                                type="password"
                                className={pageStyles.input}
                                error={!!(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                                name="password"
                                label="Senha"
                                as={Input}
                            />
                            <Field
                                className={pageStyles.lastInput}
                                error={!!(touched.coopCode && errors.coopCode)}
                                helperText={touched.coopCode && errors.coopCode}
                                name="coopCode"
                                label="Codigo Cooperativa"
                                as={Input}
                            />
                            <Button
                                disabled={isSubmitting}
                                fullWidth
                                color="dark"
                                type="submit"
                            >
                                Cadastrar
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
