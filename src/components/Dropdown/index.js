import React from "react";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

// eslint-disable-next-line react/prop-types
export default function Dropdown({ children }) {
    const useStyles = makeStyles({
        formControl: {
            width: "100%",
        },
    });

    const classes = useStyles();
    const [year, setYear] = React.useState("");

    const handleChange = (event) => {
        setYear(event.target.value);
    };

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Ano</InputLabel>
            <Select value={year} onChange={handleChange} label="Ano">
                {children}
            </Select>
        </FormControl>
    );
}
