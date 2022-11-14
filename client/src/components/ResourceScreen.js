import { useContext, useEffect, useState } from 'react';
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
import { Link } from 'react-router-dom'
import { GlobalStoreContext } from '../store';
import AuthContext from '../auth'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ResourceScreenCommentCard from './ResourceScreenCommentCard';
import NavigationBar from './NavigationBar';

export default function ResourceScreen(){
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState("");


    useEffect(() => {                                   
        // let url = window.location.href;
        // let indexBeforeURL = url.lastIndexOf("/");
        // let loadingListID = url.substring(indexBeforeURL+1);
        store.setCurrentResource(store.currentResource._id);
    }, []);

    const handleReturnCommunity = () => {
        store.closeCurrentResource();
    }

    const handlePostComment = async () => {
        console.log("handleUpdateText:" + text);
        let currentComment = [auth.user.userName, text];
        console.log(currentComment);
        let id = store.currentResource._id;
        store.postComment(id, currentComment);
    }

    const handleUpdateText = (event) => {
        event.preventDefault();
        setText(event.target.value);
    }

    let returnButton = 
    <IconButton onClick={handleReturnCommunity} sx={{fontSize:"large", flexDirection: 'column', width:'100%'}}>
        <KeyboardReturnIcon/>
    </IconButton>

    /* replace # with download number*/
    let downloadButton = 
    <IconButton>
        <DownloadIcon/>
        <Typography> {store.currentResource.Downloads} </Typography>
    </IconButton>

    /* replace # with like number*/
    let likeButton = 
    <IconButton>
        <ThumbUpOffAltIcon/>
        <Typography> {store.currentResource.Like} </Typography>
    </IconButton>

    let starButton =
    <IconButton>
        <StarBorderIcon/>
    </IconButton>

    let resourceImage = 
    <Card>
        <CardMedia
        component="img"
        alt="Satoshi Wins"
        height="265px"
        width='100%'
        image={store.currentResource.Image}
        sx={{mb:'0%', ml:'0%',mt:'0%'}}
        />
    </Card>

    // C: inside the typograph, replace it with resource description
    let resourceDescription =
    <Box>
        <Typography variant="h5">
            {store.currentResource.Description}
        </Typography>
    </Box>

    // C: inside the typograph, replace it with resource name
    let resourceName = 
    <Box>
        <Typography variant="h4"> {store.currentResource.Name} </Typography>
    </Box>

    // C: inside the typograph, replace it with author
    let resourceAuthor =
    <Box>
        <Typography variant="h6"> By: {store.currentResource.Author} </Typography>
    </Box>

    let handleSubmit =  (event) =>{
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData.get('send-comment-textfield'))
        // ** TO BE IMPLEMENT: function for the sending out comments
    }

    // C: comment board
    let comments = store.currentResource.Comments;

    let commentBoard = 
    <Box class='resource-bottom'>
        <Box class='resource-commentboard'>
            <List>
                {
                    comments.map((key) => (
                    <ResourceScreenCommentCard
                        NameCommentPair= {{user: key[0], comment: key[1]}}
                    />
                    ))
                }
            </List>
        </Box>
        <Box class = "resource-commentboard-textfield">
            <TextField
                disabled = {!auth.loggedIn}
                name="send-comment-textfield"
                id="send-comment-textfile"
                label="Add Comment"
                onChange={handleUpdateText}
                hintText="Message Field"
                required
                fullWidth
                inputProps={{style: {fontSize:12}}}
                // onKeyPress={(e)=>{if(e.key === "Enter" && e.target.value != ""){console.log("dick")}}}
            />
            <IconButton
                disabled = {!auth.loggedIn}
                variant="contained"
                onClick={handlePostComment}
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
    );
}