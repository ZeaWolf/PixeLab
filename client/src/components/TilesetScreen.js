import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import { Fab, Typography, Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid';
import HomeMapCard from './HomeMapCard';
import HomeTilesetCard from './HomeTilesetCard';
//import DeletionModal from "./DeletionModal"
import NavigationBar from "./NavigationBar"
//import Statusbar from "./Statusbar"
//import AuthContext from '../auth'
import LC from "literallycanvas";
import "../literallycanvas.css";

export default function TilesetScreen() {
    //const { auth } = useContext(AuthContext);
    //const { store } = useContext(GlobalStoreContext);

    //const lc = LC.init(document.getElementById("tileset-screen"), {})



    // return (
    //     <div className='full-screen'>
    //         <NavigationBar/>
    //         <div className='right-screen'>
    //             <div id="tileset-screen">
    //                 <Box>
    //                     <Button>New</Button>
    //                     <Button>Save</Button>
    //                     <Button>Import</Button>
    //                     <Button>Export</Button>
    //                     <Button>Publish</Button>
    //                     <Button>Share</Button>
    //                 </Box>
    //                 <LC.LiterallyCanvasReactComponent
    //                 imageURLPrefix="/literallycanvasimg"
    //                 />
    //             </div>
    //         </div>
    //     </div>
    // )

    /* Above: Chengzhi's initial tileset screen */

    let _lc = null;
    let _lc2 = null;
    let imageBounds =  {x: 0, y:0, width: 200, height: 200}
    const [image, setImage] = useState("");

    const onInit = lc => {
        _lc = lc;
        _lc2 = lc;
        console.log(lc);
    }

    const onSave = event => {
        console.log("Onclicked");
        if (!_lc){
            console.log("Disappear")
            return;
        } 
        console.log(_lc);
        // var svgString = _lc.getSVGString();
        // console.log(svgString);
        // window.open("data:image/svg+xml;base64," + btoa(svgString));
        const img = _lc.getImage({rect: imageBounds});
        if(!img) return;
        _lc = _lc2;
        console.log("image got");
        try{
            const imgData = img.toDataURL();
            setImage(imgData);
            console.log("URL: " + imgData);
        }
        catch(err){
            console.log(err);
        }
    }

    const loadingImage = (event) => {
        if(!_lc) return;
        const img =new Image();
        img.src = image;
        let shape = LC.createShape("Image", { x: 0, y: 0, image: img, scale: 0.5 });
        _lc.saveShape(shape);
    }
    
    const logging = event => {
        //event.preventDefault();
        console.log("hello");
        console.log(_lc);
    }

    return (
        <div className='full-screen'>
            <NavigationBar/>
            <div className='right-screen'>
                <div id="tileset-screen" className='literally-screen'>
                    <Box>
                        <Button onClick={logging}>New</Button>
                        <Button onClick={onSave}>Save</Button>
                        <Button onClick={loadingImage}>Import</Button>
                        <Button>Export</Button>
                        <Button>Publish</Button>
                        <Button>Share</Button>
                    </Box>
                        <LC.LiterallyCanvasReactComponent
                        onInit={onInit}
                        imageURLPrefix="/literallycanvasimg"
                        />
                </div>
            </div>
        </div>
    )
}