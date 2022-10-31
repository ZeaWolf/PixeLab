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
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ResourceScreenCommentCard from './ResourceScreenCommentCard';
import NavigationBar from './NavigationBar';

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
        sx={{mb:'0%', ml:'0%',mt:'0%'}}
        />
    </Card>

    // C: inside the typograph, replace it with resource description
    let resourceDescription =
    <Box>
        <Typography variant="h5">
            This is a image of a charmander!!!
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

    let handleSubmit =  (event) =>{
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData.get('send-comment-textfield'))
        // ** TO BE IMPLEMENT: function for the sending out comments
    }

    // C: comment board
    let commentBoard = 
    <Box class='resource-bottom'>
        <Box class='resource-commentboard'>
            <list>
                <ResourceScreenCommentCard></ResourceScreenCommentCard>
                <ResourceScreenCommentCard></ResourceScreenCommentCard>
                <ResourceScreenCommentCard></ResourceScreenCommentCard>
                <ResourceScreenCommentCard></ResourceScreenCommentCard>
                <ResourceScreenCommentCard></ResourceScreenCommentCard>
            </list>
        </Box>
        <Box component="form" noValidate onSubmit={handleSubmit} class = "resource-commentboard-textfield">
            <TextField
                name="send-comment-textfield"
                id="send-comment-textfile"
                label="Add Comment"
                required
                fullWidth
                inputProps={{style: {fontSize:12}}}
                // onKeyPress={(e)=>{if(e.key === "Enter" && e.target.value != ""){handleSubmit}}}
            />
            <IconButton
                type="submit"
                variant="contained"
            >
                Send
            </IconButton>
        </Box>
    </Box>


    return(
        <Box class='full-screen'>
            <NavigationBar/>
            <Box class='right-resource-screen'>
                {/* resource-topbar */}
                <Box class='resource-topbar'>
                    <Box class='return-button'>
                        {returnButton}
                    </Box>
                    <Box class='resource-name'>
                        {resourceName}
                    </Box>
                    <Box class='resource-author'>
                        {resourceAuthor}
                    </Box>
                </Box>
                {/* Image and Description */}
                <Box class='resource-middle'>
                    <Box class='resource-image'>
                        {resourceImage}
                    </Box>
                    <Box class='resource-description'>
                        {resourceDescription}
                    </Box>
                </Box>
                {/* Buttons */}
                <Box class='resource-buttons-board'>
                    <Box class='resource-buttons'>
                        <Box class='resource-download-button'>
                            {downloadButton}
                        </Box>
                        <Box class='resource-like-button'>
                            {likeButton}
                        </Box>
                        <Box class='resource-star-button'>
                            {starButton}
                        </Box>
                    </Box>
                </Box>
                {commentBoard}
            </Box>
        </Box>
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