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

export default function CommunityResourceCard(props) {
  const { ImgNamePair } = props;
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);

  const handleLoadResource = () => {
    store.setCurrentResource(ImgNamePair.id);
  }

  function handleShare(){
   
  };

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
        <Button size="small" onClick={handleShare}>Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>

    </Card>
    </Grid>
  );
}
