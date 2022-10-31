import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import { Fab, Typography, Box, Button, Stack, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid';
import HomeMapCard from './HomeMapCard';
import HomeTilesetCard from './HomeTilesetCard';
//import DeletionModal from "./DeletionModal"
//import NavigationBar from "./NavigationBar"
//import Statusbar from "./Statusbar"
//import AuthContext from '../auth'

export default function HomeScreen() {
    //const { auth } = useContext(AuthContext);
    //const { store } = useContext(GlobalStoreContext);

    


    return (
        <div id="home-screen">

            <Box sx={{ backgroundColor: 'warning.light'}}>
            <Typography style={{color: 'black', fontSize: 20, fontStyle: 'italic', fontWeight: "bold"}}>
                Maps
            </Typography>
            </Box>
            <Box>
                <Grid container spacing={2}>

                <Grid item xs={4} md={3}><IconButton class="home-add-button" ><AddIcon sx={{ fontSize: 140 }} /></IconButton></Grid>
                <Grid item xs={6} md={9}>
                <List id="home-map-list" style={{ display: 'flex', flexDirection: 'row', padding: 0}}>
                    <HomeMapCard/>
                    <HomeMapCard/>
                    <HomeMapCard/>
                    <HomeMapCard/>
                    <HomeMapCard/>
                    <HomeMapCard/>
                    <HomeMapCard/>
                    <HomeMapCard/>
                    <HomeMapCard/>
                    <HomeMapCard/>
                    <HomeMapCard/>
                    <HomeMapCard/>
                    <HomeMapCard/>
                </List>
                </Grid>
                </Grid>
            </Box>
            <Box sx={{ backgroundColor: 'warning.light'}}>
            <Typography style={{color: 'black', fontSize: 20, fontStyle: 'italic', fontWeight: "bold"}}>
                Tilesets
            </Typography>
            </Box>
            <Box>
            <HomeTilesetCard/>
            </Box>
        </div>
    )
}