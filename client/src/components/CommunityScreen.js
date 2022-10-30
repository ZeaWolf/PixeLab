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

	return (
        <Grid container spacing={2}>

            <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                            component="img"
                            alt="Pikachu"
                            height="140"
                            image="/static/images/cards/contemplative-reptile.jpg"
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

            <Grid item xs={3}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image="/static/images/cards/contemplative-reptile.jpg"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
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
                            alt="green iguana"
                            height="140"
                            image="/static/images/cards/contemplative-reptile.jpg"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
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
                            alt="green iguana"
                            height="140"
                            image="/static/images/cards/contemplative-reptile.jpg"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
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

