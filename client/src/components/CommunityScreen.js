import { GlobalStoreContext } from '../store';
import { useContext, useState } from 'react'
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

export default function CommunityScreen() {

    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    let listCard = "";
    const filteredPairs = store.resourceList;
    listCard = 
        <List id="community-resource-list" style={{ display: 'flex', flexDirection: 'row', padding: 0}}>
        {
            filteredPairs.map((pair) => (
                <CommunityResourceCard
                    // item xs={3}
                    key={pair._id}
                    resourceList={pair}
                    selected={false}
                    ImgNamePair={{img:"/defaultpic.png", name:pair.Name, tilesetID:pair._id}}
                />
            ))
        }
        </List>;
	
	return (

        <Box className="full-screen"> 
        <NavigationBar/>
        <GuestModal/>
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
                            variant="outlined"
                            fullWidth
                            label="Search"
                        />
                     </div>
                </div>
            </Grid>

            <Grid item xs={0.2}>
                
            </Grid>

            <Grid item xs={2.7}>
                <form>
                    <fieldset data-role = "controlgroup" data-type = "horizontal">
                    
                        <input type="checkbox" value="map" />
                        <label for="map">Map</label>
                    
                        <input type="checkbox" value="tileset" />
                        <label for="tileset">Tileset</label>

                        <input type="checkbox" value="collection" />
                        <label for="collection">Collection</label>
                    
                    </fieldset>
                </form>
            </Grid>

            <Grid item xs={2.2}>
                <div className="dropdown">
                    <button className="dropbtn">Sort By Lastest</button>
                    <div className="dropdown-content">
                        <a href="#">Sort By Lastest</a>
                        <a href="#">Sort By Most Like</a>
                        <a href="#">Sort By Most Download</a>
                    </div>
                </div>
            </Grid>

            <div id="lists-selector">
                {
                    listCard
                }
            </div>

            

            {/* <Grid item xs={3}>
                <Card sx={{ width: '95%', height: '100%'}}>
                    <CardMedia
                            component="img"
                            alt="moutainforest"
                            height="50%"
                            image="/moutainforest.png"
                    />
                    <CardContent height="45%">
                        <Typography gutterBottom variant="h5" component="div">
                            moutain forest
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className = "content_scroll">
                        A mountain is an elevated portion of the Earth's crust, generally with steep sides that show significant exposed bedrock. Although definitions vary, a mountain may differ from a plateau in having a limited summit area, and is usually higher than a hill, typically rising at least 300 metres (1,000 feet) above the surrounding land. A few mountains are isolated summits, but most occur in mountain ranges.
                        </Typography>
                    </CardContent>
                    <CardActions height="5%">
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={3}>
                <Card sx={{ width: '95%', height: '100%'}}>
                    <CardMedia
                            component="img"
                            alt="rockland"
                            height="50%"
                            image="/rockland.jpeg"
                    />
                    <CardContent height="45%">
                        <Typography gutterBottom variant="h5" component="div">
                            rockland
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className = "content_scroll">
                        Rockland County is the southernmost county on the west side of the Hudson River in the U.S. state of New York. It is part of the New York City metropolitan statistical area. It is about 6 miles (10 kilometers) from the Bronx at their closest points. The county's population, as of the 2020 United States Census, is 338,329,[4] making it the state's third-most densely populated county outside New York City (after Nassau and neighboring Westchester Counties, respectively).
                        </Typography>
                    </CardContent >
                    <CardActions height="5%">
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={3}>
                <Card sx={{ width: '95%', height: '100%'}}>
                    <CardMedia
                            component="img"
                            alt="Pikachu"
                            height="50%"
                            image="/charmander.jpeg"
                    />
                    <CardContent height="45%">
                        <Typography gutterBottom variant="h5" component="div">
                            Charmander
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className = "content_scroll">
                            Charmander (Japanese: ヒトカゲ Hitokage) is a Fire-type Pokémon introduced in Generation I.
                        </Typography>
                    </CardContent>
                    <CardActions height="5%">
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={3}>
                <Card sx={{ width: '95%', height: '100%'}}>
                    <CardMedia
                            component="img"
                            alt="Pikachu"
                            height="50%"
                            image="/pikachu.jpeg"
                    />
                    <CardContent height="45%">
                        <Typography gutterBottom variant="h5" component="div">
                            Pikachu
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className = "content_scroll">
                            Pikachu (Japanese: ピカチュウ Pikachu) is an Electric-type Pokémon introduced in Generation I.
                        </Typography>
                    </CardContent>
                    <CardActions height="5%">
                            <Button size="small">Share</Button>
                            <Button component={Link} to="/resource" size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={3}>
                <Card sx={{ width: '95%', height: '100%'}}>
                    <CardMedia
                            component="img"
                            alt="Pikachu"
                            height="50%"
                            image="/pikachu.jpeg"
                    />
                    <CardContent height="45%">
                        <Typography gutterBottom variant="h5" component="div">
                            Pikachu
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className = "content_scroll">
                            Pikachu (Japanese: ピカチュウ Pikachu) is an Electric-type Pokémon introduced in Generation I.
                        </Typography>
                    </CardContent>
                    <CardActions height="5%">
                            <Button size="small">Share</Button>
                            <Button component={Link} to="/resource" size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid> */}

        </Grid>
        </Box>

		
	)
}

