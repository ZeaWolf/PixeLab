import * as React from 'react';
import { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, IconButton, CardActionArea } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GlobalStoreContext } from '../store';
import DeleteModal from './DeleteModal';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
export default function CommunityResourceCard(props) {
    const { store } = useContext(GlobalStoreContext);
}