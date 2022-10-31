import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import { useContext } from 'react';


export default function ErrorModal(){

    const style = {
        position: 'relative',
        top: '50%',
        // bottom: '50%',
        left: '50%',
        // right: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        // px: 4,
        // pb: 3
    };

    let messageText = "Sample Text (when build this change it to props)"

    const handleClick = (event) => {
        event.preventDefault();
        // auth.closeErrorModal();     // need auth function implemented
    }

    const handleClose = (event) => {
        event.preventDefault();
        console.log("close")
    };

    return (
        <div>
          <Dialog
            open={true}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Delete Window Dialog"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete this map
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Confirm</Button>
              <div style={{flex: '1 0 0'}} />
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}