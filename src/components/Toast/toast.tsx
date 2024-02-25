import React from "react"
import Snackbar from '@mui/material/Snackbar';
import { IconButton, SnackbarContent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

type toastData = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    autoHideDuration: number
    message: string
}

export default function Toast({open, setOpen, autoHideDuration, message}: toastData) {
    const vertical = "bottom"
	const horizontal = "left"

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

    const action = (
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" sx={{color: 'lightgrey'}}/>
          </IconButton>
        </>
      );


    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            anchorOrigin={{vertical, horizontal}}
        >
            <SnackbarContent
                sx={{
                    backgroundColor: '#FFFFFF',
                    color: 'black',
                }}
                message={message}
                action={action}
            />
        </Snackbar>
    )
}