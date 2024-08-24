import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import {useAdverts} from "../../context/adverts-context/AdvertsContext";

const DeleteAlert = ( {advert} ) => {
    const { deleteAd } = useAdverts();
    const [open, setOpen] = useState(false);

    const handleDeleteAd = () => {
        setOpen(true);
    };

    const handleConfirmDelete = () => {
        setOpen(false);
        deleteAd(advert.id);
    };

    const handleCancelDelete = () => {
        setOpen(false);
    };

    return (
        <div style={{ position: "absolute",  right: "3rem" }}>
            <IconButton onClick={handleDeleteAd}>
                <DeleteIcon />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        İlanı silmek istediğinize emin misiniz?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Hayır
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                        Evet
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteAlert;
