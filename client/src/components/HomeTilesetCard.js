import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, IconButton, CardActionArea } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function HomeTilesetCard(props) {
  const { ImgNamePair } = props;

  return (
    <Card className="home-tileset-card" style={{background:"linear-gradient(to bottom, #64cdfa 5%, #f6f5dd)"}}>
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
          <IconButton aria-label="delete"><DeleteIcon /></IconButton>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}