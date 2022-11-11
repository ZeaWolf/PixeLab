import * as React from 'react';
import { useContext, useEffect, useState } from 'react'
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
import TextField from '@mui/material/TextField';
export default function HomeTilesetCard(props) {
  const { ImgNamePair} = props;
  const { store } = useContext(GlobalStoreContext);
  const history = useHistory();
  const [editActive, setEditActive] = useState(false);
  const [text, setText] = useState("");

  const handleOpenTileset = event => {
    store.loadTilesetPage(ImgNamePair.tilesetID);
    // push to the tileset-editor screen by router
    history.push("/tileset-editor");
  }

  const handleDeleteTileset = async event => {
    store.MarkDeleteTileset(ImgNamePair.tilesetID);
    console.log("shugui是gay")
  }

  function handleToggleEdit(event) {
    event.stopPropagation();
    toggleEdit();
  }

  function toggleEdit() {
    let newActive = !editActive;
    setEditActive(newActive);
  }

  function handleKeyPress(event) {
    if (event.code === "Enter") {
        console.log(text)
        store.RenameTileset(ImgNamePair.tilesetID, text);
        // store.loadTilesets();
        toggleEdit();
    }
  }

  function handleUpdateText(event) {
    setText(event.target.value);
  }

  let TilesetItem =
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
          <IconButton aria-label="rename"><EditIcon onClick={handleToggleEdit}/></IconButton>
          <IconButton aria-label="delete"><DeleteIcon onClick={handleDeleteTileset}/></IconButton>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>

  if (editActive == true){
    TilesetItem =
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
        <TextField
         sx={{ flexGrow: 1 }} onKeyPress={handleKeyPress} onChange={handleUpdateText}
         defaultValue={ImgNamePair.name}
          inputProps={{style: {fontSize: 10}}}
          InputLabelProps={{style: {fontSize: 10}}}
         >{ImgNamePair.name}</TextField>
        <IconButton aria-label="rename"><EditIcon onClick={handleToggleEdit}/></IconButton>
        <IconButton aria-label="delete"><DeleteIcon onClick={handleDeleteTileset}/></IconButton>
        </Box>
      </CardContent>
    </CardActionArea>
  </Card>
  }

  return (
    TilesetItem
  );
}