import React from "react";

import {
    createMuiTheme,
    MuiThemeProvider,
    useMediaQuery,
} from "@material-ui/core";
import MaterialTable from "material-table";
import PropTypes from "prop-types";

import theme from "../../styles/customMuiTheme.js";

const tableTheme = (isMobile) =>
    createMuiTheme({
        ...theme,
        overrides: {
            ...theme.overrides,
            MuiPaper: {
                root: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: isMobile ? 400 : 512,
                    maxWidth: 1044,
                    padding: "0 25px",
                    width: "100%",
                },
                rounded: {
                    borderRadius: 8,
                },
            },
            MuiToolbar: {
                root: {
                    paddingLeft: "16px!important",
                },
            },
            MuiTableSortLabel: {
                root: {
                    "&:hover": {
                        color: theme.palette.secondary.main,
                    },
                },
                active: {
                    "&:hover": {
                        color: theme.palette.secondary.main,
                    },
                },
            },
        },
    });

export default function Table({
    columns,
    data,
    title,
    actions,
    update,
    delete: deleteRow,
    ...rest
}) {
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <MuiThemeProvider theme={tableTheme(isMobile)}>
            <MaterialTable
                options={{
                    pageSizeOptions: [],
                }}
                columns={columns}
                data={data}
                title={title}
                actions={actions}
                localization={{
                    toolbar: {
                        searchPlaceholder: "Procurar",
                        searchTooltip: "Procurar",
                    },
                    header: { actions: "" },
                    body: {
                        editRow: {
                            deleteText: "Tem certeza que deseja excluir?",
                        },
                        deleteTooltip: "Excluir",
                        editTooltip: "Editar",
                        emptyDataSourceMessage: "Nenhum item adicionado!",
                    },
                    pagination: {
                        nextTooltip: "Próxima",
                        lastTooltip: "Última página",
                        firstTooltip: "Primeira página",
                        previousTooltip: "Anterior",
                    },
                }}
                editable={{
                    onRowUpdate: (newData, oldData) => update(newData, oldData),
                    onRowDelete: (oldData) => deleteRow(oldData),
                }}
                {...rest}
            />
        </MuiThemeProvider>
    );
}
Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.object),
    update: PropTypes.func.isRequired,
    delete: PropTypes.func,
};
