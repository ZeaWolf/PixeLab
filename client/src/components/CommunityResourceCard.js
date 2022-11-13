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

export default function CommunityResourceCard(props) {
  const { ImgNamePair } = props;

  return (
    <Card className="community-resource-card">
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={ImgNamePair.img}
          alt="img"
        />
        <CardContent>
          <Box style={{ display: 'flex', flexDirection: 'row'}}>
          <Typography sx={{ flexGrow: 1 }}>{ImgNamePair.name}</Typography>
          <IconButton aria-label="rename"><EditIcon /></IconButton>
          <IconButton component={Link} to="/window-dialog" aria-label="delete"><DeleteIcon /></IconButton>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
