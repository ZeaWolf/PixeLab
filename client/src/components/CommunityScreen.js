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
import NavigationBar from './NavigationBar'

export default function CommunityScreen() {
	//const { auth } = useContext(AuthContext);
	//const { store } = useContext(GlobalStoreContext);

    // const styles = {
    //     media: {
    //       height: 0,
    //       paddingTop: '56.25%', // 16:9,
    //       marginTop:'30'
    //     }
    // };

	return (
        <Grid container spacing={0} rowSpacing={1} id="community-screen">

            <Grid item xs={6}>
                <Typography gutterBottom variant="h7" fontSize="34px" component="div">
                    Community List
                </Typography>
            </Grid>

            <Grid item xs={4}>
                <form>
                <fieldset>
                    <div>
                        <input type="checkbox" value="map" />
                        <label for="map">Map</label>
                    </div>
                    <div>
                        <input type="checkbox" value="tileset" />
                        <label for="tileset">Tileset</label>
                    </div>
                    <div>
                        <input type="checkbox" value="collection" />
                        <label for="collection">Collection</label>
                    </div>
                </fieldset>
                </form>
            </Grid>

            <Grid item xs={2}>
                <div class="dropdown">
                    <button class="dropbtn">Dropdown</button>
                    <div class="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
            </Grid>

            

            <Grid item xs={3}>
                <Card sx={{ width: 258, height: 350 }}>
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
                            moutain forest
                        </Typography>
                    </CardContent>
                    <CardActions height="5%">
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={3}>
                <Card sx={{ width: 258, height: 350 }}>
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
                            rockland
                        </Typography>
                    </CardContent>
                    <CardActions height="5%">
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={3}>
                <Card sx={{ width: 258, height: 350 }}>
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
                <Card sx={{ width: 258, height: 350 }}>
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
                <Card sx={{ width: 258, height: 350 }}>
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

        </Grid>


		
	)
}

