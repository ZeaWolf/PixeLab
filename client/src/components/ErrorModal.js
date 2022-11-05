import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

import { useContext } from 'react';
import AuthContext from '../auth'



export default function ErrorModal(){
    const { auth } = useContext(AuthContext);

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

    const handleClick = (event) => {
        event.preventDefault();
        auth.closeErrorModal();     // need auth function implemented
    }

    
    return(
        <Modal
        open={auth.error}
        aria-labelledby="error-modal-title"
        aria-describedby="error-modal-description"
        style={{display:'flex', alginItem:"center", justifyContent:'center'}}
        >
            <Typography align="center">
                <Box sx={style}>
                    <Alert variant="filled" severity="warning">
                    <Typography variant="body1" >{auth.message}</Typography>
                    </Alert>
                    <Typography id="empty-line-error-modal" mt={2}></Typography>
                    <Button 
                    variant="contained"
                    onClick = {handleClick}
                    >
                        Close
                    </Button>
                </Box>
            </Typography>
        </Modal>
    )
}