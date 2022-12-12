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
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store';
import { useHistory } from 'react-router-dom'
import AuthContext from '../auth'
import { getAutoHeightDuration } from '@mui/material/styles/createTransitions';

// import DeleteModal from './DeleteModal';


export default function HomeMapCard(props) {
  const { ImgNamePair } = props;
  const { store } = useContext(GlobalStoreContext);
  const history = useHistory();
  const [editActive, setEditActive] = useState(false);
  const [text, setText] = useState("");
  const { auth } = useContext(AuthContext);

  const handleOpenMap = async event => {
    await store.loadMapPage(ImgNamePair.mapID);
  }

  const handleDeleteMap = async event => {
    store.MarkDeleteMap(ImgNamePair.mapID);
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
        store.RenameMap(ImgNamePair.mapID, text);
        toggleEdit();
    }
  }

  function handleUpdateText(event) {
    setText(event.target.value);
  }

  let mapImg = "/defaultpic.png"
  let mapSrc = ImgNamePair.src;
  if (mapSrc !== "None"){
    mapImg = mapSrc;
  }

  let deleteButton = "";
  if(auth.user.email === ImgNamePair.owner){
    deleteButton = <IconButton aria-label="delete"><DeleteIcon onClick={handleDeleteMap}/></IconButton>;
  }


  let MapItem =
  <Card className="home-map-card" style={{background:"linear-gradient(to bottom, #64cdfa 5%, #f6f5dd)"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={mapImg}
          alt="img"
          onClick={handleOpenMap}
        />
        <CardContent>
          <Box style={{ display: 'flex', flexDirection: 'row'}}>
          <Typography sx={{ flexGrow: 1 }}>{ImgNamePair.name}</Typography>
          <IconButton aria-label="rename"><EditIcon onClick={handleToggleEdit}/></IconButton>
          {deleteButton}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>

  if (editActive === true){
    MapItem =
  <Card className="home-map-card" style={{background:"linear-gradient(to bottom, #64cdfa 5%, #f6f5dd)"}}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="100"
        image={mapImg}
        alt="img"
        onClick={handleOpenMap}
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
        {deleteButton}
        </Box>
      </CardContent>
    </CardActionArea>
  </Card>
  }

  return (
    MapItem
  );
}

