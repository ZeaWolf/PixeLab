import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box';
import React, { useContext, useEffect, useState,useRef } from 'react'
import { Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Grid from '@mui/material/Grid';
import { GlobalStoreContext } from '../store'


function LayerCard(props){
    const { pairs } = props;
    const { store } = useContext(GlobalStoreContext);

    async function handleDeleteLayer(){
        store.DeleteLayer(pairs.key);
    }
    async function handleToggleVisibility(){
         
    }

    let visibilityButton =
        <IconButton><VisibilityIcon/></IconButton>

    let LayerList = 
        <ListItem>
            <Grid container spacing={1} >

                <Grid item xs={6}>
                    <Typography style={{color:'blue'}}>Layer Untitled</Typography>
                </Grid>

                <Grid item xs={1.25}>
                    <IconButton aria-label="delete"><ArrowDownwardIcon /></IconButton>
                </Grid>

                <Grid item xs={1.25}>
                    <IconButton aria-label="delete"><ArrowUpwardIcon /></IconButton>
                </Grid>

                <Grid item xs={1.25}>
                    {visibilityButton}
                </Grid>

                <Grid item xs={1.25}>
                    <IconButton aria-label="delete"><DeleteIcon onClick={handleDeleteLayer}/></IconButton>
                </Grid>

            </Grid>
    </ListItem>


    return(
        LayerList
    )
}

export default LayerCard;