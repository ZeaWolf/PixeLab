import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box';
import { Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Grid from '@mui/material/Grid';

function LayerCard(props){
    const { NameLayerPair } = props;
    async function handleDeleteLayer(){
        console.log("call store delete function")
    }
    async function handleToggleVisibility(){
         
    }

    let visibilityButton =
        <IconButton><VisibilityIcon/></IconButton>

    let LayerList = 
        <ListItem>
            <Grid container spacing={1} >

                <Grid item xs={6}>
                    <Typography style={{color:'blue'}}>Layer hello</Typography>
                </Grid>

                <Grid item xs={1.25}>
                    <IconButton aria-label="delete"><ArrowDownwardIcon onClick={handleDeleteLayer}/></IconButton>
                </Grid>

                <Grid item xs={1.25}>
                    <IconButton aria-label="delete"><ArrowUpwardIcon onClick={handleDeleteLayer}/></IconButton>
                </Grid>

                <Grid item xs={1.25}>
                    {visibilityButton}
                </Grid>

                <Grid item xs={1.25}>
                    <IconButton aria-label="delete"><DeleteIcon onClick={handleDeleteLayer}/></IconButton>
                </Grid>

            </Grid>
    </ListItem>


    return(
        LayerList
    )
}

export default LayerCard;