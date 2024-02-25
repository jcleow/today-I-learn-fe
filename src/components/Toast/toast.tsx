import React from "react"
import Snackbar from '@mui/material/Snackbar';

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


    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            message={message}
            anchorOrigin={{vertical, horizontal}}
        />
    )
}