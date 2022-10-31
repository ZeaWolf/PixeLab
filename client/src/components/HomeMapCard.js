import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function HomeMapCard(props) {
  const { ImgNamePair } = props;

  return (
    <Card class="home-map-card">
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={ImgNamePair.img}
          alt="img"
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {ImgNamePair.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
