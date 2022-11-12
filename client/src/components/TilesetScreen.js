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
import AuthContext from '../auth'
import LC from "literallycanvas";
import "../literallycanvas.css";

export default function TilesetScreen() {
    const { auth } = useContext(AuthContext);
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

    let imageBounds =  {x: 0, y:0, width: 288, height: 288}
    const [image, setImage] = useState("");
    const [canvas, setCanvas] = useState({});
    const { store } = useContext(GlobalStoreContext);
    const backgroundImg = new Image();
    backgroundImg.src = '8x8grid.png'
    // backgroundImg is 1600 x 1600


    const onInits = async lc => {
        setCanvas(lc);
        let uploadedImage = await store.loadTilesetResourceImage(store.currentTilesetId);
            if(uploadedImage != null){
                const img = new Image();
                img.src = uploadedImage;

                // load tileset
                let shape = LC.createShape("Image", { x: 0, y: 0, image: img, scale: 1 });
                lc.saveShape(shape);
        }
    }

    const onSave = async event => {
        if (!canvas){
            return;
        }
        const img = canvas.getImage({rect: imageBounds});
        if(!img) return;
        try{
            const imgData = img.toDataURL();
            setImage(imgData);
            console.log("URL: " + typeof imgData);
            await store.saveTilesetSpace(store.currentTilesetId, imgData);
        }
        catch(err){
            console.log(err);
        }
    }

    // const loadingImage = async (event) => {
    //     if(!canvas) return;
    //     // async function loadImage(){
    //         let uploadedImage = await store.loadTilesetResourceImage(store.currentTilesetId);
    //         console.log("result: " + store.currentTilesetId);
    //         console.log("result: " + uploadedImage);
    //         if(uploadedImage != null){
    //             const img = new Image();
    //             console.log(uploadedImage);
    //             img.src = uploadedImage;
    //             console.log(img.src);
    //             // img.src = image; // comment this when works
    //             // console.log(typeof image);
    //             let shape = LC.createShape("Image", { x: 0, y: 0, image: img, scale: 1 });
    //             canvas.saveShape(shape);
    //         }
    // }

    const publishTileset = async event => {
        store.publishTileset(store.currentTilesetId);
    }

    let tilesetPage = 
        <div className='full-screen'>
            <Typography style={{color: 'black', fontSize: 20, fontStyle: 'italic', fontWeight: "bold"}}>
                401: Unauthorized Access
            </Typography>
        </div>

    let lcOptions = {
        onInit: onInits,
        imageURLPrefix: "/literallycanvasimg",
        backgroundShapes: [
            LC.createShape("Image", { x: 0, y: 0, image: backgroundImg, scale: 0.16 }),
            LC.createShape("Image", { x: 32, y: 0, image: backgroundImg, scale: 0.16 }),
            LC.createShape("Image", { x: 0, y: 32, image: backgroundImg, scale: 0.16 }),
            LC.createShape("Image", { x: 32, y: 32, image: backgroundImg, scale: 0.16 }),
        ]
    }

    if(auth.loggedIn){
        tilesetPage = 
        <div className='full-screen'>
            <NavigationBar/>
            <div className='right-screen'>
                <div id="tileset-screen" className='literally-screen'>
                    <Box>
                        <Button>New</Button>
                        <Button onClick={onSave}>Save</Button>
                        <Button>Import</Button>
                        <Button>Export</Button>
                        <Button onClick={publishTileset}>Publish</Button>
                        <Button>Share</Button>
                    </Box>
                        <LC.LiterallyCanvasReactComponent
                        // onInit={onInits}
                        // imageURLPrefix="/literallycanvasimg"
                        {...lcOptions}
                        />
                </div>
            </div>
        </div>
    }

    return (
        <div className='outer-screen'>
            {tilesetPage}
        </div>
        // <div className='full-screen'>
        //     <NavigationBar/>
        //     <div className='right-screen'>
        //         <div id="tileset-screen" className='literally-screen'>
        //             <Box>
        //                 <Button>New</Button>
        //                 <Button onClick={onSave}>Save</Button>
        //                 <Button onClick={loadingImage}>Import</Button>
        //                 <Button>Export</Button>
        //                 <Button>Publish</Button>
        //                 <Button>Share</Button>
        //             </Box>
        //                 <LC.LiterallyCanvasReactComponent
        //                 onInit={onInit}
        //                 imageURLPrefix="/literallycanvasimg"
        //                 />
        //         </div>
        //     </div>
        // </div>
    )
}