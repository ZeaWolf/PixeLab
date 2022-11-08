import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AuthContext from '../auth';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

function GuestModal(){
    const { auth } = useContext(AuthContext);
    

    console.log("what fuck "+ auth.guestModal);

    const style = {
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        p: 2,
        px: 4,
        pb: 3,
    };

    const handleClick = (event) => {
        event.preventDefault();
        auth.closeGuestModal();     // need auth function implemented
    }

    
    return(
        <Modal
            open={auth.guestModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
            <Typography align="center">
                <Box sx={style}>
                    <Alert variant="filled" severity="warning">Please login to see home/map/tileset pages</Alert>
                    <Typography id="empty-line-guest-modal" mt={2}></Typography>
                    <Box display="flex" justifyContent="center" alignItems="center">
                    <Stack spacing={6} direction="row">
                        <Button
                            variant="contained"
                            href = "/login/"
                        >
                            Login
                        </Button>

                        <Button
                            variant="contained"
                            onClick={handleClick}
                        >
                            Cancel
                        </Button>
                    </Stack>
                    </Box>
                </Box>
            </Typography>
        </Modal>
    );
}

export default GuestModal;