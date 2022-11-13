import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Box,CardHeader, CardActionArea, IconButton, Grid} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

export default function CommunityResourceCard(props) {
  const { ImgNamePair } = props;

  function handleShare(){
    console.log(ImgNamePair.img);
    console.log("This is id:::::"+ImgNamePair.name);
  };

  return (
    <Grid item xs={3}>
    <Card id="resource-card">
      <CardMedia
          component="img"
          height="100"
          image={ImgNamePair.img}
       />
      <CardContent height="90">
        <Typography gutterBottom variant="h5" component="div">
          moutain forest
        </Typography>
        <Typography variant="body2" color="text.secondary" className = "content_scroll">
          A mountain is an elevated portion of the Earth's crust, generally with steep sides that show significant exposed bedrock. Although definitions vary, a mountain may differ from a plateau in having a limited summit area, and is usually higher than a hill, typically rising at least 300 metres (1,000 feet) above the surrounding land. A few mountains are isolated summits, but most occur in mountain ranges.
        </Typography>
      </CardContent>
      <CardActions height="20">
        <Button size="small" onClick={handleShare}>Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>

    </Card>
    </Grid>
  );
}
