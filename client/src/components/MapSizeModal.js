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
import TextField from '@mui/material/TextField';

function MapSizeModal(props){
    const { store } = useContext(GlobalStoreContext);

    const {isCreateMap, cancelCreateMap} = props;

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        cancelCreateMap();
        //const myArray = value.split(" ");
        const data = new FormData(event.currentTarget);

        store.createMap("Untitled", Number(data.get("Height")), Number(data.get("Width")));
    }

    
    return(
        <Modal
            open={isCreateMap}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
            <Typography align="center">
                <Box component="form" noValidate onSubmit={handleSubmit} sx={style}  autoComplete="off">
                    <Typography> Please enter the size of your map!</Typography>

                    <TextField
                        label="Height"
                        type="number"
                        margin="normal"
                        name="Height"
                        fullWidth
                    />
                    <TextField
                        label="Width"
                        type="number"
                        margin="normal"
                        name="Width"
                        fullWidth
                    />
                     
                {/* <FormControl>
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
                </FormControl> */}
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Stack spacing={6} direction="row" align="center">
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Confirm
                            </Button>

                            <Button
                                variant="contained"
                                onClick={cancelCreateMap}
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