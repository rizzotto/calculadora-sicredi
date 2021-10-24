import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";

import { closeDialog } from "../../actions/dialogActions";

export default function GlobalDialog() {
    const state = useSelector((state) => state.dialog);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeDialog());
    };

    return (
        <Dialog
            PaperProps={{ style: { backgroundColor: "#F0F0F5" } }}
            open={state.open}
            onClose={handleClose}
            {...state.options}
        >
            <DialogTitle>{state.title}</DialogTitle>
            <DialogContent {...state.styleContent}>
                {state.content}
            </DialogContent>
            <DialogActions>{state.actions}</DialogActions>
        </Dialog>
    );
}
