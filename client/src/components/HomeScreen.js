import React, { useContext, useEffect, useState  } from 'react'
import { GlobalStoreContext } from '../store'
import { Fab, Typography, Box, Button, Stack, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SaveAltIcon from '@mui/icons-material/SaveAlt';
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
import MapSizeModal from './MapSizeModal';

export default function HomeScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const[isCreateMap, setIsCreateMap] = useState(false);

    useEffect(() => {
        store.loadHomeScreen();
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

    const AddMapButton = styled(IconButton)({
        'position': 'relative',
        'backgroundColor': '#008CBA',
        'borderWidth': '5px',
        'color': 'white',
        'marginLeft': '20%',
        'marginTop': '15%',
        'height': '25%',
        'width': '60%',
        'borderRadius': '12px',
    })

    function handleCreateNewMap() {
        setIsCreateMap(true);
        //store.createMap("Untitled", 20, 25);
    }
    function cancelCreateMap(){
        setIsCreateMap(false);
    }

    function handleCreateNewTileset() {
        store.createNewTileset();
    }

    function handleImportMap(event){
        try{
            const reader = new FileReader();
            reader.addEventListener("load", ()=> {
                let importedMap = "";
                importedMap = reader.result;
                // remove prefix
                let output = importedMap.slice('data:application/json;base64,'.length);
                // decoding
                var b = Buffer.from(output, 'base64')
                let decode = b.toString();
                // parsing the decode json
                let layersArray = JSON.parse(decode);
                

                // store.importMapJson(id, layers, source, tilesets, nextlayerid, height, width);
                store.importMapJson(layersArray.layers, layersArray.Previewed, layersArray.tilesets, layersArray.nextlayerid, layersArray.height, layersArray.width);
                // lazy implementation
                // history.push('/home');

            })
            if(event.target.files && event.target.files[0]){
                reader.readAsDataURL(event.target.files[0]);
            }
        }catch(err){
            console.log(err);
        }
    }


    let listCard_tilesets = "";
    let filteredPairs_tilesets = store.tilesetList;
    listCard_tilesets = 
        <List id="home-tileset-list" style={{ display: 'flex', flexDirection: 'row', padding: 0}}>
        {
            filteredPairs_tilesets.map((pair) => (
                <HomeTilesetCard
                    key={pair._id}
                    tilesetList={pair}
                    selected={false}
                    ImgNamePair={{img:"/defaultpic.png", name:pair.Name, tilesetID:pair._id, src:pair.Source}}
                />
            ))
        }
        </List>;

    let listCard_maps = "";
    let filteredPairs_maps = store.mapList;
    listCard_maps = 
        <List id="home-map-list" style={{ display: 'flex', flexDirection: 'row', padding: 0}}>
        {
            filteredPairs_maps.map((pair) => (
                <HomeMapCard
                    key={pair._id}
                    mapList={pair}
                    selected={false}
                    ImgNamePair={{img:"/defaultpic.png", name:pair.Name, mapID:pair._id, src:pair.Previewed}}
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
            <MapSizeModal
                isCreateMap = {isCreateMap}
                cancelCreateMap = {cancelCreateMap}
            />
            <div className='right-screen'>
                <Box id='home-screen'>
                    {/* upper half screen 50% */}
                    <Box id='home-map-section'>
                        <Box className='home-section-name'>
                            <Typography ml={3} style={{color: 'black', fontSize: 20, fontWeight: "bold"}}>
                                 Maps
                            </Typography>
                        </Box>
                        <Box className='home-section-card'>
                            <Grid className='home-grid' container spacing={2}>
                                <Grid item xs={4} md={2}>
                                    <AddMapButton onClick = {handleCreateNewMap}> <AddIcon sx={{ fontSize: 50 }}/> </AddMapButton >
                                    {/* <Button onClick={importMap} component="label">Import Map<input type="file" id="jsonfileinput" hidden onChange={importMap}/></Button> */}
                                    <AddMapButton component="label" onClick = {handleImportMap}> <SaveAltIcon sx={{ fontSize: 50 }}/> <input type="file" id="jsonfileinput" hidden onChange={handleImportMap}/></AddMapButton >
                                </Grid>
                                <Grid item xs={6} md={10}>
                                    {/* <List id="home-map-list" style={{ display: 'flex', flexDirection: 'row', padding: 0}}>
                                    </List> */}
                                    <div id="lists-selector">
                                        {
                                            listCard_maps
                                        }
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {/* lower half screen 50% */}
                    <Box id='home-tileset-section'>
                        <Box className='home-section-name' >
                            <Typography ml={3} style={{color: 'black', fontSize: 20, fontWeight: "bold"}}>
                                Tilesets
                            </Typography>
                        </Box>
                        <Box className='home-section-card'>
                            <Grid className='home-grid' container spacing={2}>
                                <Grid item xs={4} md={2}>
                                    <AddButton className="home-add-button" onClick = {handleCreateNewTileset}> <AddIcon sx={{ fontSize: 100 }}/> </AddButton>
                                </Grid>
                                <Grid item xs={6} md={10}>
                                {/* <List id="home-tileset-list" style={{ display: 'flex', flexDirection: 'row', padding: 0}}>
                                    <HomeTilesetCard ImgNamePair={{img:"/pikachu.jpeg", name:"Pikachu Tileset"}}/>
                                    <HomeTilesetCard ImgNamePair={{img:"/charmander.jpeg", name:"Charmander Tileset"}}/>
                                </List> */}
                                    {
                                        listCard_tilesets
                                    }
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </div>
        </div>
    }

    return (
        <div className='outer-screen'>
            {homePage}
        </div>
    )
}