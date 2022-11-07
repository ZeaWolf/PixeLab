import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AuthContext from '../auth';
import Typography from '@mui/material/Typography';


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
            <Box sx={style}>
                <Alert severity="warning">Please login to see home/map/tileset pages</Alert>
                <Button
                    href = "/login/"
                >
                    Confirm
                </Button>

                <Button
                    onClick={handleClick}
                >
                    Cancel
                </Button>
            </Box>

        </Modal>
    );
}

export default GuestModal;