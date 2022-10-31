import { useContext } from 'react';
import Box from '@mui/material/Box';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function ResourceScreen(){
    let returnButton = 
    <IconButton sx={{fontSize:"large", flexDirection: 'column', width:'100%'}}>
        <KeyboardReturnIcon/>
    </IconButton>

    /* replace # with download number*/
    let downloadButton = 
    <IconButton>
        <DownloadIcon/>
        <Typography> # </Typography>
    </IconButton>

    /* replace # with like number*/
    let likeButton = 
    <IconButton>
        <ThumbUpOffAltIcon/>
        <Typography> # </Typography>
    </IconButton>

    let starButton =
    <IconButton>
        <StarBorderIcon/>
    </IconButton>

    let resourceImage = 
    <Card>
        <CardMedia
        component="img"
        alt="Pikachu"
        height="100%"
        width='100%'
        image="/charmander.jpeg"
        />
    </Card>

    // C: inside the typograph, replace it with resource description
    let resourceDescription =
    <Box>
        <Typography variant="h5">
            This is a image of charmander!!!
        </Typography>
    </Box>

    // C: inside the typograph, replace it with resource name
    let resourceName = 
    <Box>
        <Typography variant="h4"> Map Name </Typography>
    </Box>

    // C: inside the typograph, replace it with author
    let resourceAuthor =
    <Box>
        <Typography variant="h6"> By: author </Typography>
    </Box>

    // C: comment board
    let commentBoard = 
    <div class='resource-bottom'>
        <Typography>HI</Typography>
    </div>


    return(
        <Grid container spacing={2}>
        <Grid xs={1}>
            {returnButton}
        </Grid>
        <Grid xs={9}>
            {resourceName}
        </Grid>
        <Grid xs={2}>
            {resourceAuthor}
        </Grid>
        <Grid xs={8}>
        </Grid>
        </Grid>
    );
}