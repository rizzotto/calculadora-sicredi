import React from "react";

import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";

import theme from "../../styles/customMuiTheme.js";

const useStyles = makeStyles({
    table: {
        maxHeight: 100,
    },
    span: {
        color: theme.palette.quaternary.main,
    },
});

export default function SimpleTable({ rows, handleDelete, ...rest }) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} style={{ maxHeight: 250 }} {...rest}>
            <Table className={classes.table} aria-label="simple table">
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={`${row.year}-${index}`}>
                            <TableCell component="th" scope="row">
                                {row.year}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <span className={classes.span}>R$</span>{" "}
                                {row.result}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    aria-label="delete"
                                    onClick={() =>
                                        handleDelete({ year: row.year })
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

SimpleTable.propTypes = { rows: PropTypes.array, handleDelete: PropTypes.func };
