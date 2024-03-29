import * as React from 'react';
import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AuthContext from '../auth';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';



export default function PublishErrorModal(props){
    const { auth } = useContext(AuthContext);
    const { hasSource, setHasSourceFunction } = props;

    const style = {
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        p: 2,
        px: 4,
        pb: 3,
    };

    const handleClose = (event) => {
        setHasSourceFunction(false);
    }

    return(
            <Modal
                open={hasSource}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{display:'flex',alignItems:'center',justifyContent:'center'}}
            >
                <Typography align="center">
                    <Box sx={style}>
                        <Alert variant="filled" severity="warning">You Can't Publish Empty Work ! ! !</Alert>
                        <Typography id="empty-line-guest-modal" mt={2}></Typography>
                        <Box display="flex" justifyContent="center" alignItems="center">
                        <Stack spacing={6} direction="row">
                            <Button
                                variant="contained"
                                onClick={handleClose}
                            >
                                Close
                            </Button>
                        </Stack>
                        </Box>
                    </Box>
                </Typography>
            </Modal>
    )
}