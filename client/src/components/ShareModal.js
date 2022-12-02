import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AuthContext from '../auth';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';


function ShareModal(props){
    const { store } = useContext(GlobalStoreContext);
    const {isShare, name, id, cancelShare, shareProject} = props;
    const [email, setEmail] = useState("");

    const style = {
        width: 700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        p: 2,
        px: 4,
        pb: 3,
    };

    // const handleClick = (event) => {
    //     event.preventDefault();   
    // }
    const handleUpdateEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleShare = async (event) => {
        event.preventDefault();  
        await shareProject(id, email);
        cancelShare();
    }
    
    return(
        <Modal
            open={isShare}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{display:'flex', alignItems:'center',justifyContent:'center'}}
        >

            <Box align="left" sx={style}>
            <Typography variant="h5">
                Share "{name}" with
            </Typography>
            <Typography id="empty-line-guest-modal" mt={2}></Typography>
            <TextField id="sharebar" label="Enter email here..." variant="outlined" fullWidth onChange={handleUpdateEmail}/>
            <Typography id="empty-line-guest-modal" mt={2}></Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Stack spacing={6} direction="row">
                    <Button
                        variant="contained"
                        onClick={handleShare}
                    >
                        Share
                    </Button>

                    <Button
                        variant="contained"
                        onClick={cancelShare}
                    >
                        Cancel
                    </Button>
                    </Stack>
                </Box>
            </Box>

        </Modal>
    );
}

export default ShareModal;