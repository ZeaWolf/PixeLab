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

export default function CommunityScreen() {
	
	return (

        <Box className="full-screen"> 
        <NavigationBar/>
        <Grid container spacing={0} rowSpacing={1} id="community-screen">

            <Grid item xs={7.1}>
                <Typography gutterBottom variant="h7" fontSize="34px" component="div">
                    Community
                </Typography>
            </Grid>

            <Grid item xs={2.7} >
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

            

            <Grid item xs={3}>
                <Card sx={{ width: '95%', height: '100%'}}>
                    <CardMedia
                            component="img"
                            alt="moutainforest"
                            height="140"
                            image="/moutainforest.png"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            moutain forest
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            moutain forest
                        </Typography>
                    </CardContent>
                    <CardActions>
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
                            height="140"
                            image="/rockland.jpeg"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            rockland
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            rockland
                        </Typography>
                    </CardContent>
                    <CardActions>
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
                            height="140"
                            image="/charmander.jpeg"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Charmander
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
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
                            <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={3}>
                <Card sx={{ width: '95%', height: '100%'}}>
                    <CardMedia
                            component="img"
                            alt="Pikachu"
                            height="140"
                            image="/pikachu.jpeg"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Pikachu
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Pikachu (Japanese: ピカチュウ Pikachu) is an Electric-type Pokémon introduced in Generation I.
                        </Typography>
                    </CardContent>
                    <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>

        </Grid>
        </Box>

		
	)
}

