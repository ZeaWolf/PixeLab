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
    const { pairs } = props;
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");

    async function handleDeleteLayer(){
        store.DeleteLayer(pairs.key);
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
            store.RenameLayer(pairs.key, text);
            toggleEdit();
        }
    }
    
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    async function handleArrowUpward(){
         store.arrowUpward(pairs.key);
    }

    async function handleArrowDownward(){
        store.arrowDownward(pairs.key);
   }

    let visibilityButton =
        <IconButton><VisibilityIcon/></IconButton>

    let LayerList = 
        <ListItem>
            <Grid container spacing={1} >

                <Grid item xs={4.75}>
                    <Typography style={{color:'rgb(35, 35, 35)'}}>{pairs.map.Name}</Typography>
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