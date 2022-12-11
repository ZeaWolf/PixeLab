import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
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
        let url = window.location.href;
        let indexBeforeURL = url.lastIndexOf("/");
        let loadingListID = url.substring(indexBeforeURL+1);
        // store.closeCurrentResource();
        store.setCurrentResource(loadingListID);
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


    async function handleDownload(event){
        event.stopPropagation();
        let url = window.location.href;
        let indexBeforeURL = url.lastIndexOf("/");
        let loadingListID = url.substring(indexBeforeURL+1);
        await store.handleDownload(loadingListID);
        if(store.currentResource.Type === "tileset"){
            const link = document.createElement('a');
            link.download = `${store.currentResource.Name}.png`;
            link.href = store.currentResource.Source;
            link.click();
        }
        if(store.currentResource.Type === "map"){
            console.log("resource map type")
            // download json file first
            let dataUri = store.currentResource.JsonStringFile;
            let exportFileDefaultName = `${store.currentResource.Name}.json`;
            let linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
            // download the tilesets through looping
            let tilesetArry = store.currentResource.MapTilesetArray;
            console.log(store.currentResource.MapTilesetArray);
            console.log(tilesetArry.length);
            for(let i = 0; i < tilesetArry.length; i++){
                console.log("clicked" + i);
                let link = document.createElement('a');
                link.download = tilesetArry[i].name; // name of the image
                link.href = tilesetArry[i].source;
                link.click();
            }
        }
        await store.setCurrentResource(loadingListID);
    }
    /* replace # with download number*/
    let downloadNumber = 0;
    if(store.currentResource){
        downloadNumber = store.currentResource.Downloads;
    }
    let downloadButton = 
    <IconButton onClick={handleDownload}>
        <DownloadIcon/>
        <Typography> {downloadNumber} </Typography>
    </IconButton>


    async function handleLike(event){
        event.stopPropagation();
        if(!auth.user){
            return;
          }
        let url = window.location.href;
        let indexBeforeURL = url.lastIndexOf("/");
        let loadingListID = url.substring(indexBeforeURL+1);
        if (auth.user.likeList.includes(loadingListID)===false){
            await store.likeResource(loadingListID, "+");
            await auth.updateUserLikelist(loadingListID);
            await store.setCurrentResource(loadingListID);
        }
        else{
            await store.likeResource(loadingListID, "-");
            await auth.updateUserLikelist(loadingListID);
            await store.setCurrentResource(loadingListID);
        }
    };

    /* replace # with like number*/
    let likeNumber = 0;
    if(store.currentResource){
        likeNumber = store.currentResource.Like;
    }
    let likeButton = 
    <Button onClick={handleLike}>
        <ThumbUpOffAltIcon/>
        <Typography> {likeNumber} </Typography>
    </Button>

    if(auth.user && store.currentResource && auth.user.likeList.includes(store.currentResource._id)===true){
        likeButton = 
        <Button onClick={handleLike}>
            <ThumbUpIcon/>
            <Typography> {likeNumber} </Typography>
        </Button>
    }


    async function handleCollection(event){
        event.stopPropagation();
        if(!auth.user){
            return;
          }
        let url = window.location.href;
        let indexBeforeURL = url.lastIndexOf("/");
        let loadingListID = url.substring(indexBeforeURL+1);
        await auth.updateUserCollectionlist(loadingListID);
        await store.setCurrentResource(loadingListID);
      };
    let starButton =
    <Button onClick={handleCollection}>
        <StarBorderIcon/>
    </Button>
    if(auth.user && store.currentResource && auth.user.collectionList.includes(store.currentResource._id)===true){
        starButton = 
        <Button onClick={handleCollection}>
            <StarIcon/>
        </Button>
    }


    let imageSourceText = "";
    if(store.currentResource){
        imageSourceText = store.currentResource.Image;
    }
    let resourceImage = 
    <Card>
        <CardMedia
        component="img"
        alt="Satoshi Wins"
        height="265px"
        width='100%'
        image={imageSourceText}
        sx={{mb:'0%', ml:'0%',mt:'0%'}}
        />
    </Card>

    // C: inside the typograph, replace it with resource description

    let textDescription = "";
    if(store.currentResource){
        textDescription = store.currentResource.Description;
    }
    let resourceDescription =
    <Box>
        <Typography variant="h5">
            {textDescription}
        </Typography>
    </Box>

    // C: inside the typograph, replace it with resource name
    let textName = ""
    if(store.currentResource){
        textName = store.currentResource.Name;
    }
    let resourceName = 
    <Box>
        <Typography variant="h4"> {textName} </Typography>
    </Box>

    // C: inside the typograph, replace it with author
    let textAuthor = ""
    if(store.currentResource){
        textAuthor = store.currentResource.Author;
    }
    let resourceAuthor =
    <Box>
        <Typography variant="h6"> By: {textAuthor} </Typography>
    </Box>

    let handleSubmit =  (event) =>{
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData.get('send-comment-textfield'))
        // ** TO BE IMPLEMENT: function for the sending out comments
    }

    // C: comment board
    let comments = [];
    if(store.currentResource){
        comments = store.currentResource.Comments;
    }

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