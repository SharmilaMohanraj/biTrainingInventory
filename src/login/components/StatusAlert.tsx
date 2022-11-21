import React from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function StatusAlert (props:any) {
    return (
        <div>
            {
                    (props.status.severity === 'error' &&
                        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose} >
                            <MuiAlert elevation={6} sx={{ width: '100%' }} variant="filled" severity='error' onClose={props.handleClose}>
                                {props.status.message}</MuiAlert>
                        </Snackbar>) ||
                    (props.status.severity === 'success' &&
                        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose} >
                            <MuiAlert elevation={6} sx={{ width: '100%' }} variant="filled" severity='success' onClose={props.handleClose}>
                                {props.status.message}</MuiAlert>
                        </Snackbar>) ||
                    (props.status.severity === 'warning' &&
                        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose} >
                            <MuiAlert elevation={6} sx={{ width: '100%' }} variant="filled" severity='warning' onClose={props.handleClose}>
                                {props.status.message}</MuiAlert>
                        </Snackbar>)
                }
        </div>
    );
}
export default StatusAlert;