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
import PublishErrorModal from './PublishErrorModal'
import PublishModal from './PublishModal'
import LC from "literallycanvas";
import "../literallycanvas.css";
import api from '../api'

export default function TilesetScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    let imageBounds =  {x: 0, y:0, width: 384, height: 384}
    const [image, setImage] = useState("");
    const [canvas, setCanvas] = useState({});
    const [hasSource, setHasSource] = useState(false);
    const [isPublish, setIsPublish] = useState(false);
    const backgroundImg = new Image();
    backgroundImg.src = '8x8grid.png'
    // backgroundImg is 1600 x 1600
    const setHasSourceFunction = (bools) => {
        setHasSource(bools);
    }
    const setNotPublishFunction = () => {
        setIsPublish(false);
    }
    const setPublishDescriptionFunction = (text) => {
        store.publishTileset(store.currentTileset._id, text);
        setIsPublish(false);
    }

    const onInits = async (lc) => {
        setCanvas(lc);
        //console.log("Initial ID: " + store.currentTilesetId);
        //console.log(store.currentTilesetId)
        let uploadedImage = await store.loadTilesetResourceImage(store.currentTileset._id);
            if(uploadedImage != null){
                const img = new Image();
                img.src = uploadedImage;

                // load tileset
                let shape = LC.createShape("Image", { x: 0, y: 0, image: img, scale: 1 });
                lc.saveShape(shape);
        }
    }

    const onSave = async (event) => {
        if (!canvas){
            return;
        }
        const img = LC.renderSnapshotToImage(canvas.getSnapshot(['shapes', 'imageSize', 'colors', 'position', 'scale']), {rect: imageBounds});
        if(!img) return;
        try{
            const imgData = img.toDataURL();
            setImage(imgData);
            //console.log("URL: " + typeof imgData);
            await store.saveTilesetSpace(store.currentTileset._id, imgData);
        }
        catch(err){
            console.log(err);
        }
    }

    const onImport = async (event) =>{
        const reader = new FileReader();
        reader.addEventListener("load", ()=> {
            var importImage = "";
            importImage = reader.result;
            const img = new Image();
            img.src = importImage;
            let shape = LC.createShape("Image", { x: 0, y: 0, image: img, scale: 1 });
            canvas.saveShape(shape);
        })
        if(event.target.files && event.target.files[0]){
            reader.readAsDataURL(event.target.files[0]);
        }
        //fr.readAsDataURL(fileEl.files[0]);
        //fr.addEvent
    }
    const onExport = async (event) =>{
        event.preventDefault();
        if (!canvas){
            return;
        }
        // var data = canvas.getImage({rect: imageBounds}).toDataURL();
        // var image = new Image();
        // image.src = data;

        // Get name
        const link = document.createElement('a');
        link.download = `${store.currentTileset.Name}.png`;
        link.href = LC.renderSnapshotToImage(canvas.getSnapshot(['shapes', 'imageSize', 'colors', 'position', 'scale']), {rect: imageBounds}).toDataURL();
        //link.href = canvas.getImage({rect: imageBounds}).toDataURL();
        link.click();
        //link.delete;
        //const w = window.open("");
        //w.document.write(image.outerHTML);
        return;
    }

    const publishTileset = async event => {
        let response = await api.getTilesetById(store.currentTileset._id);
        if(response.data.success){
            let tilesetSource = response.data.data.Source;
            if(tilesetSource !== ""){
                setIsPublish(true);
            }
            else{
                setHasSourceFunction(true);
            }
        }
    }

    let tilesetPage = 
        <div className='full-screen'>
            <Typography style={{color: 'black', fontSize: 20, fontStyle: 'italic', fontWeight: "bold"}}>
                401: Unauthorized Access
            </Typography>
        </div>

    let bgGrid = []
    for(let i=32; i<384; i=i+32){
        bgGrid.push(LC.createShape('Line', {x1:0, y1:i, x2:384, y2:i, strokeWidth:1, color:'black', capStyle: null, endCapShapes:null}));
        bgGrid.push(LC.createShape('Line', {x1:i, y1:0, x2:i, y2:384, strokeWidth:1, color:'black', capStyle: null, endCapShapes:null}));
    }
    let lcOptions = {
        onInit: onInits,
        imageURLPrefix: "/literallycanvasimg",
        backgroundShapes: bgGrid,
            // LC.createShape("Image", { x: 0, y: 0, image: backgroundImg, scale: 0.16 }),
            // LC.createShape("Image", { x: 128, y: 0, image: backgroundImg, scale: 0.16 }),
            // LC.createShape("Image", { x: 0, y: 128, image: backgroundImg, scale: 0.16 }),
            // LC.createShape("Image", { x: 128, y: 128, image: backgroundImg, scale: 0.16 }),
        imageSize: {width: 384, height: 384}
    }

    if(auth.loggedIn){
        tilesetPage = 
        <div className='full-screen'>
            <NavigationBar/>
            <PublishErrorModal
                hasSource = {hasSource}
                setHasSourceFunction = {setHasSourceFunction}
            />
            <PublishModal
                isPublish = {isPublish}
                setNotPublishFunction = {setNotPublishFunction}
                setPublishDescriptionFunction = {setPublishDescriptionFunction}
            />
            <Box className='right-screen'>
                <Box id="tileset-screen" >
                    <Box id="tileset-toolbar">
                        <Button >New</Button>
                        <Button onClick={onSave}>Save</Button>
                        <Button onClick={onImport} component="label">Import <input type="file"hidden onChange={onImport}/></Button>
                        <Button onClick={onExport}>Export</Button>
                        <Button onClick={publishTileset}>Publish</Button>
                        <Button>Share</Button>
                    </Box>
                    <Box id="drawing-box">
                        <LC.LiterallyCanvasReactComponent
                            // onInit={onInits}
                            // imageURLPrefix="/literallycanvasimg"
                            {...lcOptions}
                        />
                    </Box>
                </Box>
            </Box>
        </div>
    }

    return (
        <div className='outer-screen'>
            {tilesetPage}
        </div>
    )
}