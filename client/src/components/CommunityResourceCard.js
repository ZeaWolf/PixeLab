import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Box,CardHeader, CardActionArea, IconButton, Grid} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import { GlobalStoreContext } from '../store';
import AuthContext from '../auth'
import { useContext, useState, useEffect } from 'react'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import DownloadIcon from '@mui/icons-material/Download';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function CommunityResourceCard(props) {
  const { ImgNamePair } = props;
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);

  const handleLoadResource = () => {
    store.setCurrentResource(ImgNamePair.id);
  }

  function handleLike(event){
    event.stopPropagation();
    if (auth.user.likeList.includes(ImgNamePair.id)==false){
      store.likeTileset(ImgNamePair.id, "+");
      auth.updateUserLikelist(ImgNamePair.id);
    }
    else{
      store.likeTileset(ImgNamePair.id, "-");
      auth.updateUserLikelist(ImgNamePair.id);
    }
  };


  function handleDownload(event){
    event.stopPropagation();
    store.handleDownload(ImgNamePair.id);
  };

  function handleCollection(event){
    event.stopPropagation();
    auth.updateUserCollectionlist(ImgNamePair.id);
  };

  let likeButton = 
    <Button size="small" onClick={handleLike}>
      <ThumbUpOffAltIcon/>
      <Typography> {ImgNamePair.like} </Typography>
    </Button>

  if(auth.user.likeList.includes(ImgNamePair.id)==true){
    likeButton = 
      <Button size="small" onClick={handleLike}>
        <ThumbUpIcon/>
        <Typography> {ImgNamePair.like} </Typography>
      </Button>
  }
  
  let CollectionButton = 
    <Button size="small" onClick={handleCollection}>
      <StarBorderIcon/>
      <Typography></Typography>
    </Button>

  if(auth.user.collectionList.includes(ImgNamePair.id)==true){
    CollectionButton = 
      <Button size="small" onClick={handleCollection}>
        <StarIcon/>
        <Typography></Typography>
      </Button>
  }

  return (
    <Grid item xs={3}>
    <Card id="resource-card" onClick={handleLoadResource}>
      <CardMedia
          component="img"
          height="100"
          image={ImgNamePair.img}
       />
      <CardContent height="90">
        <Typography gutterBottom variant="h5" component="div">
          {ImgNamePair.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className = "content_scroll">
          {ImgNamePair.description}
        </Typography>
      </CardContent>
      <CardActions height="20">
        {likeButton}

        <Button size="small" onClick={handleDownload}>
          <DownloadIcon/>
          <Typography> {ImgNamePair.downloads} </Typography>
        </Button>

        {CollectionButton}

      </CardActions>

    </Card>
    </Grid>
  );
}
