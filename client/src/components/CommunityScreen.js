import { GlobalStoreContext } from '../store';
import { useContext, useState, useEffect } from 'react'
import AuthContext from '../auth'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import NavigationBar from './NavigationBar';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import GuestModal from './GuestModal';
import List from '@mui/material/List'
import CommunityResourceCard from './CommunityResourceCard';
import Checkbox from '@mui/material/Checkbox';

export default function CommunityScreen() {

    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [check,setCheck] = useState([false,false,false]);
    // const [mapFilter,setMapFilter] = useState([]);
    // const [tilesetFilter,setTilesetFilter] = useState([]);
    // const [collectionFilter,setCollectionFilter] = useState([]);
    const [sortShow,setSortShow] = useState("Sort By Lastest");
    const [searchFilter,setSearchFilter] = useState(false);

    useEffect(() => {
        store.loadResources();
    }, []);

    function handleMap(event, filter){
        event.preventDefault();
        setCheck([event.target.checked,check[1],check[2]]);
        console.log(filter);
        if(check[0] === true){
            store.filterController([false,check[1],check[2]]);
        }else{
            store.filterController([true,check[1],check[2]]);
        }
        
    }

    function handleTileset(event, filter){
        event.preventDefault();
        setCheck([check[0],event.target.checked,check[2]]);
        console.log(filter);
        if(check[1] === true){
            store.filterController([check[0],false,check[2]]);
        }else{
            store.filterController([check[0],true,check[2]]);
        }
    }

    function handleCollection(event, filter){
        event.preventDefault();
        setCheck([check[0],check[1],event.target.checked]);
        console.log(filter);
        if(check[2] === true){
            store.filterController([check[0],check[1],false]);
        }else{
            store.filterController([check[0],check[1],true]);
        }
    }

    function handleLastest(event,sort){
        store.resourceList.sort(function(a, b) {
            if(a.PublishTime === undefined){
                return 1;
            }
            if(b.PublishTime === undefined){
                return -1;
            }
            return new Date(b.PublishTime) - new Date(a.PublishTime);
        });
        setSortShow(sort);
    }

    function handleMostLike(event,sort){
        store.resourceList.sort(function(a, b) {return b.Like - a.Like;});
        setSortShow(sort);
    }

    function handleMostDownload(event,sort){
        store.resourceList.sort(function(a, b) {return b.Downloads - a.Downloads;});
        setSortShow(sort);
    }

    function handleSearchBar(event){
        let value = document.getElementById('search-bar').value;
        if(value !== ""){
            setSearchFilter(true);
        }else{
            setSearchFilter(false);
        }

    }


    let listCard = "";
    const filteredPairs = store.resourceList;

    if(searchFilter === true){
        listCard = 
        <List className="resource-list" style={{ display: 'flex', flexDirection: 'row', flexWrap:'wrap'}}>
        {
            filteredPairs.filter((pair)=> !pair.Name.indexOf(document.getElementById('search-bar').value)).map((pair) => (
                <CommunityResourceCard
                    key={pair._id}
                    resourceList={pair}
                    selected={false}
                    ImgNamePair={{img:pair.Image, name:pair.Name, id:pair._id,
                        description:pair.Description, like:pair.Like, downloads:pair.Downloads }}
                />
            ))
        }
        </List>;
    }else{
        listCard = 
        <List className="resource-list" style={{ display: 'flex', flexDirection: 'row', flexWrap:'wrap'}}>
        {
            filteredPairs.map((pair) => (
                <CommunityResourceCard
                    key={pair._id}
                    resourceList={pair}
                    selected={false}
                    ImgNamePair={{img:pair.Source, name:pair.Name, id:pair._id,
                        description:pair.Description, like:pair.Like, downloads:pair.Downloads }}
                />
            ))
        }
        </List>;
    }
    
	
	return (

        <Box className="full-screen"> 
        <NavigationBar/>
        <GuestModal/>
        <Box>
        <Grid container spacing={0} rowSpacing={1} id="community-screen">

            <Grid item xs={3}>
                <Typography gutterBottom variant="h7" fontSize="34px" component="div">
                    Community
                </Typography>
            </Grid>

            <Grid item xs={3.9}>
                <div>
                    <div>
                        <TextField
                            id="search-bar"
                            variant="outlined"
                            fullWidth
                            label="Search"
                            onChange={(event)=>{handleSearchBar(event);}}
                        />
                     </div>
                </div>
            </Grid>

            <Grid item xs={0.2}>
                
            </Grid>

            <Grid item xs={2.7}>
                <form>
                    <fieldset data-role = "controlgroup" data-type = "horizontal">
                    
                        <input type="checkbox" value="map" onChange={(event)=>{handleMap(event, "map")}} checked = {check[0]}/>
                        <label for="map">Map</label>
                    
                        <input type="checkbox" value="tileset" onChange={(event)=>{handleTileset(event, "tileset");}} checked = {check[1]}/>
                        <label for="tileset">Tileset</label>

                        <input type="checkbox" value="collection" onChange={(event)=>{handleCollection(event, "collection")}} checked = {check[2]}/>
                        <label for="collection">Collection</label>
                    
                    </fieldset>
                </form>
            </Grid>

            <Grid item xs={2.2}>
                <div className="dropdown">
                    <button className="dropbtn">{sortShow}</button>
                    <div className="dropdown-content">
                        <a href="#" onClick = {(event)=>{handleLastest(event,"Sort By Lastest");}} >Sort By Lastest</a>
                        <a href="#" onClick = {(event)=>{handleMostLike(event,"Sort By Most Like");}} >Sort By Most Like</a>
                        <a href="#" onClick = {(event)=>{handleMostDownload(event,"Sort By Most Download");}} >Sort By Most Download</a>
                    </div>
                </div>
            </Grid>
        </Grid>
        </Box>

        <Box className='community-resource-list'>
            <Grid container spacing={0} rowSpacing={1}>
            {
                listCard
            }
            </Grid>
        </Box>
            
        </Box>

		
	)
}

