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
        <div class='right-resource-screen'>
            {/* resource-topbar */}
            <div class='resource-topbar'>
                <div class='return-button'>
                    {returnButton}
                </div>
                <div class='resource-name'>
                    {resourceName}
                </div>
                <div class='resource-author'>
                    {resourceAuthor}
                </div>
            </div>
            {/* Image and Description */}
            <div class='resource-middle'>
                <div class='resource-image'>
                    {resourceImage}
                </div>
                <div class='resource-description'>
                    {resourceDescription}
                </div>
            </div>
            {/* Buttons */}
            <div class='resource-buttons-board'>
                <div class='resource-buttons'>
                    <div class='resource-download-button'>
                        {downloadButton}
                    </div>
                    <div class='resource-like-button'>
                        {likeButton}
                    </div>
                    <div class='resource-star-button'>
                        {starButton}
                    </div>
                </div>
            </div>
            <div class='resource-bottom'>
                <div class='resource-commentboard'>
                    <Typography>HI</Typography>
                </div>
            </div>
        </div>
        // <Grid container spacing={0} className='right-resource-screen'>
        //     <Grid item xs={1} height='7%'>
        //         {returnButton}
        //     </Grid>
        //     <Grid item xs={9} height='7%'>
        //         {resourceName}
        //     </Grid>
        //     <Grid item xs={2} height='7%'>
        //         {resourceAuthor}
        //     </Grid>
        //     <Grid item xs={6} height='41%'>
        //         {resourceImage}
        //     </Grid>
        //     <Grid item xs={6} height='41%'>
        //         {resourceDescription}
        //     </Grid>
        //     <Grid>

        //     </Grid>
        // </Grid>
    );
}