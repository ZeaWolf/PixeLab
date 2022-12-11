import { useContext } from 'react';
import * as React from 'react';
import { GlobalStoreContext } from '../store';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AuthContext from '../auth';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import DialogContentText from '@mui/material/DialogContentText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function MapSizeModal(){
    const { store } = useContext(GlobalStoreContext);
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const style = {
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        p: 2,
        px: 4,
        pb: 3,
    };

    const handleCreateMap = async (event) => {
        event.preventDefault();
        const myArray = value.split(" ");
        console.log(myArray[0]+myArray[2])
    }

    
    return(
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
            <Typography align="center">
                <Box sx={style}>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Please choose the map size !!</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="20 * 25 Tiles"
                        name="radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="20 * 25 Tiles" control={<Radio />} label="20 * 25 Tiles" />
                        <FormControlLabel value="25 * 20 Tiles" control={<Radio />} label="25 * 20 Tiles" />
                        <FormControlLabel value="15 * 30 Tiles" control={<Radio />} label="15 * 30 Tiles" />
                    </RadioGroup>
                </FormControl>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Stack spacing={6} direction="row" align="center">
                        <Button
                            variant="contained"
                            onClick={handleCreateMap}
                        >
                            Confirm
                        </Button>

                        <Button
                            variant="contained"
                            // onClick={handleNotPublish}
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

export default MapSizeModal;