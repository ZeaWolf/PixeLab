import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import { Fab, Typography, Box, Button } from '@mui/material'
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
            <Button>Plus </Button>
            <HomeMapCard/>
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