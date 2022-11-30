import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box';
import React, { useContext, useEffect, useState,useRef } from 'react'
import { Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';


function LayerCard(props){
    // setLayer will set the current layer to this layer's index
    const { pairs, setLayer, currentLayer, deleteLayer, moveLayerUp, moveLayerDown } = props;
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");

    function setCurrentLayer(event){
        setLayer(pairs.position);
        console.log(currentLayer);
        console.log(pairs.position);
    }

    async function handleDeleteLayer(event){
        event.stopPropagation();
        console.log("deleting layer: " + pairs.position);
        deleteLayer(pairs.position);
    }

    async function handleToggleVisibility(){
         
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
            // store.RenameLayer(pairs.key, text);
            toggleEdit();
        }
    }
    
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    async function handleArrowUpward(event){
        event.stopPropagation();
        moveLayerUp(pairs.position);
    }

    async function handleArrowDownward(event){
        event.stopPropagation();
        moveLayerDown(pairs.position);
   }
    let cardColor = 'black'
    if(pairs.position === currentLayer){
        cardColor = 'blue';
    }
    else{
        cardColor = 'black';
    }

    let visibilityButton =
        <IconButton><VisibilityIcon/></IconButton>

    let LayerList = 
        <ListItem onClick={setCurrentLayer}>
            <Grid container spacing={1} style={{borderColor: {cardColor},borderStyle:"solid"}}>

                <Grid item xs={4.75}>
                    <Typography style={{color:'rgb(35, 35, 35)'}}>Layer</Typography>
                </Grid>

                <Grid item xs={1.25}>
                    <IconButton aria-label="rename"><EditIcon onClick={handleToggleEdit}/></IconButton>
                </Grid>

                <Grid item xs={1.25}>
                    <IconButton aria-label="downward"><ArrowDownwardIcon onClick={handleArrowDownward}/></IconButton>
                </Grid>

                <Grid item xs={1.25}>
                    <IconButton aria-label="upward"><ArrowUpwardIcon onClick={handleArrowUpward}/></IconButton>
                </Grid>

                <Grid item xs={1.25}>
                    {visibilityButton}
                </Grid>

                <Grid item xs={1.25}>
                    <IconButton aria-label="delete"><DeleteIcon onClick={handleDeleteLayer}/></IconButton>
                </Grid>

            </Grid>
    </ListItem>

    if (editActive == true){
        LayerList = 
        <ListItem>
            <Grid container spacing={1} >

                <Grid item xs={4.75} >
                    <TextField
                    onKeyPress={handleKeyPress} onChange={handleUpdateText}
                    defaultValue={pairs.map.Name}
                    inputProps={{style: {fontSize: 10}}}
                    InputLabelProps={{style: {fontSize: 10}}}
                    >{pairs.map.Name}</TextField>
                </Grid>

                <Grid item xs={1.25}>
                    <IconButton aria-label="rename"><EditIcon /></IconButton>
                </Grid>

                <Grid item xs={1.25}>
                    <IconButton aria-label="downward"><ArrowDownwardIcon onClick={handleArrowDownward}/></IconButton>
                </Grid>

                <Grid item xs={1.25}>
                    <IconButton aria-label="upward"><ArrowUpwardIcon onClick={handleArrowUpward}/></IconButton>
                </Grid>

                <Grid item xs={1.25}>
                    {visibilityButton}
                </Grid>

                <Grid item xs={1.25}>
                    <IconButton aria-label="delete"><DeleteIcon onClick={handleDeleteLayer}/></IconButton>
                </Grid>

            </Grid>
        </ListItem>
    }


    return(
        LayerList
    )
}

export default LayerCard;