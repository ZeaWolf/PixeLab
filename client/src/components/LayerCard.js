import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box';
import { Typography, IconButton, DeleteIcon } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function LayerCard(props){
    const {NameLayerPair} = props;
    async function handleDeleteLayer(){
        console.log("call store delete function")
    }
    async function handleToggleVisibility(){
         
    }
    let visibilityButton =
        <IconButton><VisibilityIcon/></IconButton>

    let commentCard = 
        <ListItem>
            <Box>
                <Typography sx={{ flexGrow: 1 }}>Layer</Typography>
                <IconButton aria-label="delete"><DeleteIcon onClick={handleDeleteLayer}/></IconButton>
                {visibilityButton}
            </Box>
        </ListItem>
    return(
        commentCard
    )
}

export default LayerCard;