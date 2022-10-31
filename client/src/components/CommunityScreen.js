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
        <Grid container spacing={2}>

            <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }}>
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
                <Card sx={{ maxWidth: 345 }}>
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
                <Card sx={{ maxWidth: 345 }}>
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
                    <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>

            <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }}>
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


		
	)
}

