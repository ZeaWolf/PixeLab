import * as React from 'react';
import { useContext, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, IconButton, CardActionArea } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GlobalStoreContext } from '../store';
import { useHistory } from 'react-router-dom'
import DeleteModal from './DeleteModal';

export default function HomeTilesetCard(props) {
  const { ImgNamePair} = props;
  const { store } = useContext(GlobalStoreContext);
  const history = useHistory();

  const handleOpenTileset = event => {
    store.loadTilesetPage(ImgNamePair.tilesetID);
    // push to the tileset-editor screen by router
  }

  const handleDeleteTileset = async event => {
    store.MarkDeleteTileset(ImgNamePair.tilesetID);
    console.log("shugui是gay")
  }

  return (
    <Card className="home-tileset-card" style={{background:"linear-gradient(to bottom, #64cdfa 5%, #f6f5dd)"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={ImgNamePair.img}
          alt="img"
          onClick={handleOpenTileset}
        />
        <CardContent>
          <Box style={{ display: 'flex', flexDirection: 'row'}}>
          <Typography sx={{ flexGrow: 1 }}>{ImgNamePair.name}</Typography>
          <IconButton aria-label="rename"><EditIcon /></IconButton>
          <IconButton aria-label="delete"><DeleteIcon onClick={handleDeleteTileset}/></IconButton>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}