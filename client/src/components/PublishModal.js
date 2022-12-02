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

function PublishModal(props){
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState("");
    const {isPublish, setNotPublishFunction, setPublishDescriptionFunction} = props;

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
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    const handlePublish = (event) => {
        event.preventDefault();  
        setPublishDescriptionFunction(text);
    }
    const handleNotPublish = (event) => {
        event.preventDefault();  
        setNotPublishFunction();
    }
    
    return(
        <Modal
            open={isPublish}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
            <Typography align="center">
                <Box sx={style}>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to publish?
                </DialogContentText>
                <DialogContentText id="alert-dialog-slide-description">
                    Please describe your work!
                </DialogContentText>
                    <TextField
                        sx={{ flexGrow: 1 , width: 600}}
                        onChange={handleUpdateText}
                        style={{textAlign: 'left'}}
                        hintText="Message Field"
                        floatingLabelText="MultiLine and FloatingLabel"
                        multiline
                        rows={8}
                    ></TextField>
                    <Typography id="empty-line-guest-modal" mt={2}></Typography>
                    <Box display="flex" justifyContent="center" alignItems="center">
                    <Stack spacing={6} direction="row">
                        <Button
                            variant="contained"
                            onClick={handlePublish}
                        >
                            Confirm
                        </Button>

                        <Button
                            variant="contained"
                            onClick={handleNotPublish}
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

export default PublishModal;