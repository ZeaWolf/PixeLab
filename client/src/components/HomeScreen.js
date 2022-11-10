import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import { Fab, Typography, Box, Button, Stack, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid';
import HomeMapCard from './HomeMapCard';
import HomeTilesetCard from './HomeTilesetCard';
import { styled } from '@mui/material/styles';
//import DeletionModal from "./DeletionModal"
import NavigationBar from "./NavigationBar"
//import Statusbar from "./Statusbar"
import AuthContext from '../auth'
import DeleteModal from './DeleteModal';

export default function HomeScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        // store.closeCurrentList();
        store.loadTilesets();
        // store.loadMaps();
    }, []);

    const AddButton = styled(IconButton)({
        'position': 'relative',
        'backgroundColor': '#008CBA',
        'borderWidth': '5px',
        'color': 'white',
        'marginLeft': '20%',
        'marginTop': '15%',
        'height': '60%',
        'width': '60%',
        'borderRadius': '12px',
    })

    function handleCreateNewTileset() {
        store.createNewTileset();
    }


    let listCard = "";
    const filteredPairs = store.tilesetList;
    listCard = 
        <List id="home-tileset-list" style={{ display: 'flex', flexDirection: 'row', padding: 0}}>
        {
            filteredPairs.map((pair) => (
                <HomeTilesetCard
                    key={pair._id}
                    tilesetList={pair}
                    selected={false}
                    ImgNamePair={{img:"/defaultpic.png", name:pair.Name, tilesetID:pair._id}}
                />
            ))
        }
        </List>;

    let homePage = 
        <div className='full-screen'>
            <Typography style={{color: 'black', fontSize: 20, fontStyle: 'italic', fontWeight: "bold"}}>
                 401: Unauthorized Access
            </Typography>
        </div>

    if(auth.loggedIn){
    homePage = 
        <div className='full-screen'>
            <NavigationBar/>
            <DeleteModal/>
            <div className='right-screen'>
                <div id="home-screen">

                    <Box sx={{ backgroundColor: 'warning.light'}}>
                    <Typography style={{color: 'black', fontSize: 20, fontStyle: 'italic', fontWeight: "bold"}}>
                        Maps
                    </Typography>
                    </Box>
                    <Box>
                        <Grid container spacing={2}>

                        <Grid item xs={4} md={2}>
                            <AddButton> <AddIcon sx={{ fontSize: 100 }}/> </AddButton >
                        </Grid>
                        <Grid item xs={6} md={10}>
                        <List id="home-map-list" style={{ display: 'flex', flexDirection: 'row', padding: 0}}>
                            {/* <HomeMapCard ImgNamePair={{img:"/moutainforest.png", name:"Moutain Map"}}/>
                            <HomeMapCard ImgNamePair={{img:"/rockland.jpeg", name:"Rockland Map"}}/>
                            <HomeMapCard ImgNamePair={{img:"/moutainforest.png", name:"Moutain Map"}}/>
                            <HomeMapCard ImgNamePair={{img:"/rockland.jpeg", name:"Rockland Map"}}/>
                            <HomeMapCard ImgNamePair={{img:"/moutainforest.png", name:"Moutain Map"}}/>
                            <HomeMapCard ImgNamePair={{img:"/rockland.jpeg", name:"Rockland Map"}}/>
                            <HomeMapCard ImgNamePair={{img:"/moutainforest.png", name:"Moutain Map"}}/>
                            <HomeMapCard ImgNamePair={{img:"/rockland.jpeg", name:"Rockland Map"}}/> */}
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
                    <Box>
                        <Grid container spacing={2}>

                        <Grid item xs={4} md={2}>
                            <AddButton className="home-add-button" onClick = {handleCreateNewTileset}> <AddIcon sx={{ fontSize: 100 }}/> </AddButton>
                        </Grid>
                        <Grid item xs={6} md={10}>
                        {/* <List id="home-tileset-list" style={{ display: 'flex', flexDirection: 'row', padding: 0}}>
                            <HomeTilesetCard ImgNamePair={{img:"/pikachu.jpeg", name:"Pikachu Tileset"}}/>
                            <HomeTilesetCard ImgNamePair={{img:"/charmander.jpeg", name:"Charmander Tileset"}}/>
                        </List> */}
                        <div id="lists-selector">
                            {
                                listCard
                            }
                        </div>
                        </Grid>
                        </Grid>
                    </Box>
                    </Box>
                </div>
            </div>
        </div>
    }

    return (
        <div className='outer-screen'>
            {homePage}
        </div>
        // <div className='full-screen'>
        //     <NavigationBar/>
        //     <div className='right-screen'>
        //         <div id="home-screen">

        //             <Box sx={{ backgroundColor: 'warning.light'}}>
        //             <Typography style={{color: 'black', fontSize: 20, fontStyle: 'italic', fontWeight: "bold"}}>
        //                 Maps
        //             </Typography>
        //             </Box>
        //             <Box>
        //                 <Grid container spacing={2}>

        //                 <Grid item xs={4} md={2}>
        //                     <AddButton> <AddIcon sx={{ fontSize: 100 }}/> </AddButton >
        //                 </Grid>
        //                 <Grid item xs={6} md={10}>
        //                 <List id="home-map-list" style={{ display: 'flex', flexDirection: 'row', padding: 0}}>
        //                     {/* <HomeMapCard ImgNamePair={{img:"/moutainforest.png", name:"Moutain Map"}}/>
        //                     <HomeMapCard ImgNamePair={{img:"/rockland.jpeg", name:"Rockland Map"}}/>
        //                     <HomeMapCard ImgNamePair={{img:"/moutainforest.png", name:"Moutain Map"}}/>
        //                     <HomeMapCard ImgNamePair={{img:"/rockland.jpeg", name:"Rockland Map"}}/>
        //                     <HomeMapCard ImgNamePair={{img:"/moutainforest.png", name:"Moutain Map"}}/>
        //                     <HomeMapCard ImgNamePair={{img:"/rockland.jpeg", name:"Rockland Map"}}/>
        //                     <HomeMapCard ImgNamePair={{img:"/moutainforest.png", name:"Moutain Map"}}/>
        //                     <HomeMapCard ImgNamePair={{img:"/rockland.jpeg", name:"Rockland Map"}}/> */}
        //                 </List>
        //                 </Grid>
        //                 </Grid>
        //             </Box>

        //             <Box sx={{ backgroundColor: 'warning.light'}}>
        //             <Typography style={{color: 'black', fontSize: 20, fontStyle: 'italic', fontWeight: "bold"}}>
        //                 Tilesets
        //             </Typography>
        //             </Box>
        //             <Box>
        //             <Box>
        //                 <Grid container spacing={2}>

        //                 <Grid item xs={4} md={2}>
        //                     <AddButton className="home-add-button" onClick = {handleCreateNewTileset}> <AddIcon sx={{ fontSize: 100 }}/> </AddButton>
        //                 </Grid>
        //                 <Grid item xs={6} md={10}>
        //                 {/* <List id="home-tileset-list" style={{ display: 'flex', flexDirection: 'row', padding: 0}}>
        //                     <HomeTilesetCard ImgNamePair={{img:"/pikachu.jpeg", name:"Pikachu Tileset"}}/>
        //                     <HomeTilesetCard ImgNamePair={{img:"/charmander.jpeg", name:"Charmander Tileset"}}/>
        //                 </List> */}
        //                 <div id="lists-selector">
        //                     {
        //                         listCard
        //                     }
        //                 </div>
        //                 </Grid>
        //                 </Grid>
        //             </Box>
        //             </Box>
        //         </div>
        //     </div>
        // </div>
    )
}