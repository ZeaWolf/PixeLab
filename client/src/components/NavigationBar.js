import React, { useContext, useEffect, useState  } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import GroupsIcon from '@mui/icons-material/Groups'; // for community page
import HomeIcon from '@mui/icons-material/Home'; // for home page
import MapIcon from '@mui/icons-material/Map'; // for map page
import FormatPaintIcon from '@mui/icons-material/FormatPaint'; // for tileset page
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom'
import TilesetScreen from './TilesetScreen';
import { useHistory } from 'react-router-dom';
import MapSizeInBarModal from './MapSizeInBarModal';

export default function NavigationBar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const[isCreateMap, setIsCreateMap] = useState(false);

    const history = useHistory();

    function handleCreateNewMap() {
        setIsCreateMap(true);
        //store.createMap("Untitled", 20, 25);
    }
    function cancelCreateMap(){
        setIsCreateMap(false);
    }

    function handleGuestModal(event,type) {
        console.log(type);
        if(auth.user!=null){
            if (type=="Tileset"){
                store.createNewTilesetInBar()
            }
            if (type=="Home"){
                history.push("/home/");
            }
            if (type=="Map"){
                handleCreateNewMap()
            }
        }
        else{
            auth.OpenGuestModal();
        }
    };

    return (
        <Box className= "navigationbar" alignItems="center" sx={{ left: '0%', flexDirection: 'column' }}>
            <MapSizeInBarModal
                isCreateMap = {isCreateMap}
                cancelCreateMap = {cancelCreateMap}
            />
            <Box alignItems="center" sx={{ display: { xs: 'none', md: 'flex', width: '100%' } }}>
                <IconButton component={Link} to="/community" sx={{fontSize:"large", flexDirection: 'column', width:'100%'}}>
                    <GroupsIcon/>
                    <Typography>Community</Typography>
                </IconButton>
            </Box>
            <Box alignItems="center" sx={{ display: { xs: 'none', md: 'flex', width: '100%' } }}>
                <IconButton onClick={(event)=> {
                    handleGuestModal(event, "Home")
                }}  sx={{fontSize:"large", flexDirection: 'column', width:'100%'}}>
                    <HomeIcon/>
                    <Typography>Home</Typography>
                </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex', width: '100%' } }}>
                <IconButton  onClick={(event)=> {
                    handleGuestModal(event, "Map")
                }}  sx={{fontSize:"large", flexDirection: 'column', width:'100%'}}>
                    <MapIcon/>
                    <Typography>Map</Typography>
                </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex', width: '100%' } }}> 
                <IconButton  onClick={(event)=> {
                    handleGuestModal(event, "Tileset")
                }} sx={{fontSize:"large", flexDirection: 'column', width:'100%'}}>
                    <FormatPaintIcon/>
                    <Typography>Tileset</Typography>
                </IconButton>
            </Box>
        </Box>
    );
}