import React, { useEffect, useState } from "react";

import { Autocomplete } from "@material-ui/lab";
import { useFormikContext } from "formik";
import throttle from "lodash/throttle";

import api from "../../services/api.js";
import Input from "../Input";

export default function CooperativeAutoComplete({ error, touched }) {
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = React.useState([]);
    const { values, setFieldValue } = useFormikContext();

    const fetch = React.useMemo(
        () =>
            throttle(async (request) => {
                const products = await api.get(
                    `/product?name=${request.input}`
                );
                let newOptions = [];

                if (values.prod) {
                    newOptions = [values.prod];
                }

                if (products.data.content) {
                    newOptions = [...newOptions, ...products.data.content];
                }

                setOptions(newOptions);
            }, 500),
        //eslint-disable-next-line
        []
    );

    useEffect(() => {
        let active = true;

        if (inputValue === "") {
            setOptions(values.prod ? [values.prod] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (values.prod) {
                    newOptions = [values.prod];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });
        return () => {
            active = false;
        };
    }, [values.prod, inputValue, fetch]);

    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option) =>
                typeof option === "string" ? option : option.name
            }
            filterOptions={(x) => x}
            autoComplete
            includeInputInList
            filterSelectedOptions
            noOptionsText="Nenhuma opção"
            value={values.prod}
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setFieldValue("prod", newValue, true);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <Input
                    {...params}
                    error={error}
                    helperText={touched?.idProd}
                    label="Produtos"
                    variant="outlined"
                />
            )}
        />
    );
}
