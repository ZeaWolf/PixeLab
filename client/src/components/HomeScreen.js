import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import { Fab, Typography, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid';
//import DeletionModal from "./DeletionModal"
//import NavigationBar from "./NavigationBar"
//import Statusbar from "./Statusbar"
//import AuthContext from '../auth'

export default function HomeScreen() {
    //const { auth } = useContext(AuthContext);
    //const { store } = useContext(GlobalStoreContext);

    


    return (
        <div id="home-screen">
            <Typography style={{color: '#FFFEC3', fontSize: 50, fontStyle: 'italic', fontWeight: "bold"}}>
                Welcome to PixeLab Home Screen!
            </Typography>
        </div>
    )
}