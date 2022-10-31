import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import { Fab, Typography, Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid';
import HomeMapCard from './HomeMapCard';
import HomeTilesetCard from './HomeTilesetCard';
//import DeletionModal from "./DeletionModal"
import NavigationBar from "./NavigationBar"
//import Statusbar from "./Statusbar"
//import AuthContext from '../auth'
import LC from "literallycanvas";
import "../literallycanvas.css";

export default function TilesetScreen() {
    //const { auth } = useContext(AuthContext);
    //const { store } = useContext(GlobalStoreContext);

    //const lc = LC.init(document.getElementById("tileset-screen"), {})



    return (
        <div className='full-screen'>
            <NavigationBar/>
            <div className='right-screen'>
                <div id="tileset-screen">
                    <Box>
                        <Button>New</Button>
                        <Button>Save</Button>
                        <Button>Import</Button>
                        <Button>Export</Button>
                        <Button>Publish</Button>
                        <Button>Share</Button>
                    </Box>
                    <LC.LiterallyCanvasReactComponent
                    imageURLPrefix="/literallycanvasimg"
                    />
                </div>
            </div>
        </div>
    )
}