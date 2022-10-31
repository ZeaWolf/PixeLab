import { useContext } from 'react';
import AuthContext from '../auth'

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


export default function NavigationBar() {
    // const { auth } = useContext(AuthContext);
    // const { store } = useContext(GlobalStoreContext);

    return (
        <Box className= "navigationbar" alignItems="center" sx={{ left: '0%', flexDirection: 'column' }}>
            <Box alignItems="center" sx={{ display: { xs: 'none', md: 'flex', width: '100%' } }}>
                <IconButton component={Link} to="/community" sx={{fontSize:"large", flexDirection: 'column', width:'100%'}}>
                    <GroupsIcon/>
                    <Typography>Community</Typography>
                </IconButton>
            </Box>
            <Box alignItems="center" sx={{ display: { xs: 'none', md: 'flex', width: '100%' } }}>
                <IconButton sx={{fontSize:"large", flexDirection: 'column', width:'100%'}}>
                    <HomeIcon/>
                    <Typography>  Home  </Typography>
                </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex', width: '100%' } }}>
                <IconButton component={Link} to="/map" sx={{fontSize:"large", flexDirection: 'column', width:'100%'}}>
                    <MapIcon/>
                    <Typography>Map</Typography>
                </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex', width: '100%' } }}>
                <IconButton sx={{fontSize:"large", flexDirection: 'column', width:'100%'}}>
                    <FormatPaintIcon/>
                    <Typography>Tileset</Typography>
                </IconButton>
            </Box>
        </Box>
    );
}