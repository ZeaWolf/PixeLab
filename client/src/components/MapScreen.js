
import { Fab, Typography, Box, Button,IconButton } from '@mui/material';
import React, { useContext, useEffect, useState,useRef } from 'react'
import NavigationBar from './NavigationBar'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthContext from '../auth'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import LayerCard from './LayerCard';
import List from '@mui/material/List'
import AddIcon from '@mui/icons-material/Add';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import api from '../api'
import PublishErrorModal from './PublishErrorModal'
import PublishModal from './PublishModal'
import ShareModal from './ShareModal'
import EditOffIcon from '@mui/icons-material/EditOff';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

export default function MapScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [hasSource, setHasSource] = useState(false);
    const [isPublish, setIsPublish] = useState(false);
    const [isShare, setIsShare] = useState(false);
    const [erase,seterase] = useState(false);   // check if it is in erase mode
    const [panMove, setPanMove] = useState(false);   // check if it is in pan move mode
    //chengzhi tileset tab//
    const [tabvalue, setTabvalue] = useState(0);    // use to store the index of current tileset in array
    //chengzhi tileset tab//
    const [scale2,setscale2] = useState(1);

    // below 4 are reference to the html object.
    const tilesetSelection = useRef(null);
    const canvas = useRef(null);
    const tilesetContainer = useRef(null);
    const imageRef = useRef(null);  
    const [currentLayer, setCurrentLayer] = useState(0);
    const [tilesetLoad, setTilesetLoad] = useState(false);
    // const [translatePos, setTranslatePos] = useState({canvas.width/ 2, canvas.height/ 2});

    // undo - redo stack
    // let undoStack = [];
    const [undoStack, setUndoStack] = useState([]);
    // let redoStack = [];
    const [redoStack, setRedoStack] = useState([]);
    let isDragging = false;
    let oldCoordinate = [0, 0];
    let newCoordinate = [0, 0];
    // let totalTranslate = [0, 0];
    let totalTranslateX = 0.0;
    let totalTranslateY = 0.0;

    const [finalTranslateX, setFinalTranslateX] = useState(0);
    const [finalTranslateY, setFinalTranslateY] = useState(0);

    
    let scale = 1.0;
    // let scale2 = 1.0;
    let isZoom = false;

    let layers = [];   // store the information of layers
    let tilesets = [];  // store the information of tilesets
    let tilesetsImageObject = []; // store the image Object with its source that is corresponding to the tilesets
    // let tilesetCurrentGID = 0;
    const [tilesetCurrentGID, setTilesetCurrentGID] = useState(0);

    // optimizing the run time of finding tileset to O(1) by using map
    let tilesetMap = new Map();

    let isMouseDown = false;
    const [renderLayer, setRenderLayer] = useState(true);    // if true, the layer editor will re-render
    const [renderTileset, setRenderTileset] = useState(true);  // if true, the tileset will re-render
    let selection = [0, 0];
    // let erase = false;
    const history = useHistory();

    useEffect(() => {
        let url = window.location.href;
        let indexBeforeURL = url.lastIndexOf("/");
        let loadingListID = url.substring(indexBeforeURL+1);
        store.loadMapPage(loadingListID);
        // history.push(`/map/${loadingListID}`);

        return ( ()=>{
            store.leaveMapPage(store.currentMap._id);
         });
    }, []);

    if(store.currentMap){
        // initializing the layers editor and tileset editor
        layers = store.currentMap.layers; // loading layers
        tilesets = store.currentMap.tilesets; // loading tilesets
        // copy the image of tileset
        for(let i = 0; i < tilesets.length; i++){
            tilesetsImageObject[i] = new Image();
            tilesetsImageObject[i].src = tilesets[i].source;
            // setting tilesetMap
            for(let m = tilesets[i].firstgid; m < tilesets[i].firstgid + tilesets[i].tilecount; m++){
                tilesetMap.set(m.toString(), i.toString());
            }
        }
    }
    if(tilesetSelection.current && canvas.current && tilesetContainer.current && imageRef.current){
        if(!tilesetLoad){
            setTilesetLoad(true);
            if(tilesets.length !== 0){
                imageRef.current.src = tilesets[0].source;
                if(layers.length === 0){
                    createLayer();
                }
            }
            draw();
        }
    }

    const styles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgb(235, 225, 225)"
    };

    function getCoords(e) {
        const { x, y } = e.target.getBoundingClientRect();
        const mouseX = e.clientX - x;
        const mouseY = e.clientY - y;
        return [Math.floor(mouseX / 32), Math.floor(mouseY / 32)];
    }
    function getMapCoords(e) {
        const { x, y } = e.target.getBoundingClientRect();
        const mouseX = e.clientX - x;
        const mouseY = e.clientY - y;
        return [Math.floor((mouseX-finalTranslateX) / (32*scale2)), Math.floor((mouseY-finalTranslateY) / (32*scale2))];
    }
    function getTestCoords(e) {
        const { x, y } = e.target.getBoundingClientRect();
        const mouseX = e.clientX - x;
        const mouseY = e.clientY - y;
        return [mouseX, mouseY];
    }
    // draw the layer
    function draw() {  // this is the onload function to render all layer
        var ctx = canvas.current.getContext("2d");
        // ctx.globalCompositeOperation = 'destination-over'
        // clear drawing from the canvas first
        ctx.clearRect(-10, -10, store.currentMap.width*store.currentMap.tilewidth *10, store.currentMap.height*store.currentMap.tileheight *10);
     
        var size_of_crop = 32;

        if(isZoom===true){
            ctx.scale(scale, scale);
            isZoom=false
        }
        // let dragCoordinate = [0, 0];
        // let newCoordinate = [0, 0];
        ctx.translate(newCoordinate[0]-oldCoordinate[0], newCoordinate[1]-oldCoordinate[1]);

        console.log("2")
        console.log(store.currentMap.width)
        console.log(store.currentMap.height)

        ctx.beginPath();
        for (var x = 0; x <= store.currentMap.width*32; x += 32) {
            ctx.setLineDash([20, 5]);
            ctx.moveTo(x , 0);
            ctx.lineTo(x , store.currentMap.height*32 );
        }
    
        for (var x = 0; x <= store.currentMap.height*32; x += 32) {
            ctx.moveTo(0, x);
            ctx.lineTo(store.currentMap.width*32, x );
        }
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.closePath();

        // draw by layers
        for(let i = 0; i < layers.length; i++){
            let currentLayer = layers[i]; //currentLayer
            if(currentLayer.visible){  // it is visible
                let layerInform = currentLayer.data;  // array of the layer
                let mapWidth = store.currentMap.width;
                let mapHeight = store.currentMap.height;
                let layerX = 0;
                let layerY = 0;
                // looping through the layer's data 
                for(let j = 0; j < layerInform.length; j++){
                    let thisgid = layerInform[j];
                    // since it is empyt, don't draw
                    if(thisgid === 0){
                        layerX++;
                        if(layerX === mapWidth){
                            layerX = 0;
                            layerY++;
                        }
                        continue;
                    }


                    ///----------------new mapping drawing O(1) method
                    else{
                        let wantedIndex = tilesetMap.get(thisgid.toString());
                        let wantedIndexNum = Number(wantedIndex);
                        let currentTilesetToDraw = tilesets[wantedIndexNum];   // tileset
                        let firstgid = currentTilesetToDraw.firstgid; // first gid
                        let tilesetColumns = currentTilesetToDraw.columns; // number of columns
                        let gidPostion = thisgid - firstgid;
                        let imgX = gidPostion % tilesetColumns;  // tileset x position
                        let imgY = Math.floor(gidPostion / tilesetColumns);  // tileset y position
                        ctx.drawImage(
                            tilesetsImageObject[wantedIndexNum],
                            imgX * 32,
                            imgY * 32,
                            size_of_crop,
                            size_of_crop,
                            layerX * 32,
                            layerY * 32,
                            size_of_crop,
                            size_of_crop
                        );
                    }

                    // ------------old method O(k) time
                    // for(let k = 0; k < tilesets.length; k++){
                    //     let currentTilesetToDraw = tilesets[k];   // tileset
                    //     let firstgid = currentTilesetToDraw.firstgid; // first gid
                    //     let tilecounts = currentTilesetToDraw.tilecount;
                    //     let tilesetColumns = currentTilesetToDraw.columns; // number of columns
                    //     let lastgid = firstgid + tilecounts - 1; // last gid
                    //     // check if it is the correct tileset to draw
                    //     if(thisgid >= firstgid && thisgid <= lastgid){ //it is within the gid
                    //         // find this gid in the tileset position (x, y)
                    //         let gidPostion = thisgid - firstgid;
                    //         let imgX = gidPostion % tilesetColumns;  // tileset x position
                    //         let imgY = Math.floor(gidPostion / tilesetColumns);  // tileset y position
                    //         // let tempImg = new Image();
                    //         // tempImg.src = currentTilesetToDraw.source;
                    //         // tempImg.onload = function(){
                    //             console.log("----------------------->");
                    //             console.log("Current Layer: " + i);
                    //             console.log("this k: " + k);
                    //             console.log("imgX: " + imgX);
                    //             console.log("imgY: " + imgY);
                    //             console.log("layerX: " + layerX);
                    //             console.log("layerY: " + layerY);
                            
                    //             ctx.drawImage(
                    //                 tilesetsImageObject[k],
                    //                 imgX * 32,
                    //                 imgY * 32,
                    //                 size_of_crop,
                    //                 size_of_crop,
                    //                 layerX * 32,
                    //                 layerY * 32,
                    //                 size_of_crop,
                    //                 size_of_crop
                    //             );
                    //         // }
                    //     }
                    // }


                    // keep in track of x and y coordinates of the current Layer
                    layerX++;
                    if(layerX === mapWidth){
                        layerX = 0;
                        layerY++;
                    }
                }
            }
        }
        // for(let i = 0; i < layers.length; i++){
        //     console.log(layers[i]);
        //     let currentLayer = layers[i];
        //     if(currentLayer.Opacity === 1){   // draw if it is visible
        //         let layerInform = currentLayer.Layer   // where store the actual layer key and value
        //         Object.keys(layerInform).forEach((key) => {
        //             // //Determine x/y position of this placement from key ("3-4" -> x=3, y=4)
        //             var positionX = Number(key.split("-")[0]);
        //             var positionY = Number(key.split("-")[1]);
        //             //   Image is the key's value
        //             var layerTileSrc = layerInform[key];
        //             if(layerTileSrc !== ""){ // if value === "" then not draw it
        //                 const img = new Image();
        //                 img.src = layerTileSrc;
        //                 ctx.drawImage(
        //                     img,
        //                     0 * 32,
        //                     0 * 32,
        //                     size_of_crop,
        //                     size_of_crop,
        //                     positionX * 32,
        //                     positionY * 32,
        //                     size_of_crop,
        //                     size_of_crop
        //                 );
        //             }
        //         });
        //     }
        // }
    }

    // clear undo Transactions
    function clearUndoTransactions(){
        undoStack.splice(0, undoStack.length);
    }

    // clear redo Transactions
    function clearRedoTransactions(){
        redoStack.splice(0,redoStack.length);
    }

    // clear all Transactions
    function clearAllTransactions(){
        clearUndoTransactions();
        clearRedoTransactions();
    }

    // addDrawTileTransaction function -> add a undo stack then perform the redo
    function addDrawTileTransaction(currentLayerIndex, key, oldValue, newValue){
        // empty the redoStack
        clearRedoTransactions();
        // draw the tile
        drawTile(currentLayerIndex, key, oldValue, newValue);
        let newStackElement = {"Type": "drawTile", "CurrentLayerIndex": currentLayerIndex, "Key": key, "OldValue": oldValue, "NewValue": newValue}
        undoStack.push(newStackElement);
    }

    // undo function
    function handleUndo(){
        if(undoStack.length !== 0){
            let newStackElement = undoStack.pop();
            console.log(newStackElement["Type"]);
            // if it is drawTile type
            if(newStackElement["Type"] === "drawTile"){
                let currentLayerIndex = newStackElement["CurrentLayerIndex"];
                let currentLayerKey = newStackElement["Key"];
                let currentLayerOldValue = newStackElement["OldValue"];
                let currentLayerNewValue = newStackElement["NewValue"];
                drawTile(currentLayerIndex, currentLayerKey, currentLayerNewValue, currentLayerOldValue);
            }
            // push it to the redo stack
            redoStack.push(newStackElement);
        }
    }
    // redo function
    function handleRedo(){
        if(redoStack.length !== 0){
            let newStackElement = redoStack.pop();
            // if it is drawTile type
            if(newStackElement["Type"] === "drawTile"){
                let currentLayerIndex = newStackElement["CurrentLayerIndex"];
                let currentLayerKey = newStackElement["Key"];
                let currentLayerOldValue = newStackElement["OldValue"];
                let currentLayerNewValue = newStackElement["NewValue"];
                drawTile(currentLayerIndex, currentLayerKey, currentLayerOldValue, currentLayerNewValue);
            }
            // push it to the undo stack
            undoStack.push(newStackElement);
        }
    }


    // drawTile function
    function drawTile(currentLayerIndex, key, oldValue, newValue){
        layers[currentLayerIndex].data[key] = newValue;
        draw();
    }

    // add tile to the layers
    function addTile(mouseEvent) {
        if(layers.length !== 0 ){
            var clicked = getMapCoords(mouseEvent);
            // clicked[0] -= Math.floor(totalTranslate[0] / (32*scale2));
            // clicked[1] -= Math.floor(totalTranslate[1] / (32*scale2));
            var key = clicked[0] + "-" + clicked[1];

            // console.log( Math.floor(finalTranslateX / (32*scale2)));
            // console.log( Math.ceil(finalTranslateX / (32*scale2)));
            // clicked[0] = clicked[0] - Math.floor(finalTranslateX / (32*scale2)) - 1;
            // clicked[1] = clicked[1] - Math.floor(finalTranslateY / (32*scale2)) - 1;
            console.log("x /n y:");
            console.log(finalTranslateX);
            console.log(finalTranslateY);
            console.log("oldCoordinate");
            console.log(scale2);
            console.log("tabvalue: " + tabvalue);

            // this check if the selected tile area is out of boundary
            if(clicked[0] >= store.currentMap.width || clicked[1] >= store.currentMap.height || clicked[0] < 0 || clicked[1] < 0){
                return;
            }
            if(erase) {
                // delete layers[currentLayer].Layer[key];
                // let oldValue = layers[currentLayer].Layer[key]; // find what was on this key
                // if(oldValue && oldValue !== ""){ // has oldValue means will not erase an empty tile
                //     // drawTile(currentLayer, key, oldValue, ""); // set newValue to ""
                //     addDrawTileTransaction(currentLayer, key, oldValue, "");
                // }
                let layerIndex = clicked[0] + (clicked[1] * store.currentMap.width);  // clicked[0] is the x;  clicked[1] is the y; store.currentMap.width is the number of tile in a row.
                let oldValue = layers[currentLayer].data[layerIndex];
                console.log("layerIndex: " + layerIndex);
                console.log(oldValue);
                if(oldValue === 0){
                    return; // can't erase an empty
                }
                else{
                    addDrawTileTransaction(currentLayer, layerIndex, oldValue, 0);
                }
            } else {
                // layers[currentLayer].Layer[key]=tilesetSrc;
                // let oldValue = layers[currentLayer].Layer[key]; // find what was on this key
                // if(oldValue === tilesetSrc){
                //     console.log("duplicated tilesetSrc detected!!!")
                //     return;
                // }
                // if(oldValue){ // has oldValue
                //     console.log("Not duplicated")
                //     // drawTile(currentLayer, key, oldValue, tilesetSrc); // set newValue to tilesetSrc (selectedTiled)
                //     addDrawTileTransaction(currentLayer, key, oldValue, tilesetSrc);
                // }
                // else{
                //     // drawTile(currentLayer, key, "", tilesetSrc); // oldValue was undefine, set it to ""
                //     addDrawTileTransaction(currentLayer, key, "", tilesetSrc);
                // }
                let layerIndex = clicked[0] + (clicked[1] * store.currentMap.width);  // clicked[0] is the x;  clicked[1] is the y; store.currentMap.width is the number of tile in a row.
                let oldValue = layers[currentLayer].data[layerIndex];
                console.log("layerIndex: " + layerIndex);
                console.log(oldValue);
                if(oldValue === tilesetCurrentGID || tilesetCurrentGID === 0){  // duplicated value or the GID is 0
                    console.log("duplicated tilesetSrc detected!!!");
                    return;
                }else{
                    console.log("not duplicated");
                    addDrawTileTransaction(currentLayer, layerIndex, oldValue, tilesetCurrentGID);
                }
            }
            // console.log(layers[currentLayer].Layer);
            console.log("currentlayer:-------------------------------"+currentLayer+", key: " + key);
        }
    }
    // canvas mouse down
    function handleCanvasMouseDown(event){
        if(event.button === 0 && panMove===false){
            isMouseDown = true;
            // startDragOffset.x = event.clientX - translatePos.x;
            // startDragOffset.y = event.clientY - translatePos.y;
            addTile(event);
        }
        else if(event.button === 0 && panMove===true){
            oldCoordinate = getTestCoords(event);
            newCoordinate = getTestCoords(event);
            console.log("initial point: " + oldCoordinate);
            isDragging = true;
        }
    }
    // canvas mouse up
    function handleCanvasMouseUp(event){
        isMouseDown = false;
        isDragging = false;
        setFinalTranslateX(finalTranslateX + totalTranslateX);
        setFinalTranslateY(finalTranslateY + totalTranslateY);
    }
    // canvas mouse leave
    function handleCanvasMouseLeave(event){
        isMouseDown = false;
        isDragging = false;
        setFinalTranslateX(finalTranslateX + totalTranslateX);
        setFinalTranslateY(finalTranslateY + totalTranslateY);
    }
    // canvas mouse move
    function handleCanvasMouseMove(event){
        event.stopPropagation();
        if(isMouseDown && !panMove){
            addTile(event);
        }
        if(isDragging && panMove){
            oldCoordinate = newCoordinate;
            console.log("old points: " + oldCoordinate);
            newCoordinate = getTestCoords(event);
            console.log("new points: " + newCoordinate);
            console.log("total translawedwewte: " + (newCoordinate[0] - oldCoordinate[0]) + ', ' + (newCoordinate[1] - oldCoordinate[1]));
            totalTranslateX = totalTranslateX + ((newCoordinate[0] - oldCoordinate[0]) * scale2);
            totalTranslateY = totalTranslateY + ((newCoordinate[1] - oldCoordinate[1]) * scale2);
            console.log("total translate: " + totalTranslateX + ', ' + totalTranslateY);
            draw();
        }
    }
    // tilset container mouse down
    function handleTilesetContainerMouseDown(event){
        selection = getCoords(event);
        let x = selection[0];
        let y = selection[1];
        let tempImage = new Image();
        tempImage.src = imageRef.current.src;
        tempImage.onload = function(){
            console.log("coordinates: " + selection);
            let tempImageHeight = Math.floor(tempImage.height / store.currentMap.tileheight);
            let tempImageWidth = Math.floor(tempImage.width / store.currentMap.tilewidth);
            console.log("image height: " + tempImageHeight);
            console.log("image width: " + tempImageWidth);

            // setting the border and find the current grid tile
            if(x < tempImageWidth && y < tempImageHeight && x >= 0 && y >= 0){
                // create the highlight box to indicated the location of tile
                tilesetSelection.current.style.left = selection[0] * 32 + "px";
                tilesetSelection.current.style.top = selection[1] * 32 + "px";

                // calculating the gid of selected tiled
                let firstgid = tilesets[tabvalue].firstgid;  // first gid of the tileset
                let tilecount = tilesets[tabvalue].tilecount;  // number of tilecounts in current tilesets
                let columns = tilesets[tabvalue].columns; // tileset's number of columns
                let currentGID = firstgid + (columns * y) + x;
                setTilesetCurrentGID(currentGID);
                // tilesetCurrentGID = currentGID;    // draw based on the curentGID
                console.log("currentGID: " + currentGID);

            }
        }
    }

    // pass to the props: layer card
    function setLayer(number){
        // currentLayer = number;
        setCurrentLayer(number);
        console.log("currentLayer's index before change: " + currentLayer);
    }

    // create a new layer
    function createLayer(event){
        // layer height based on map height
        let mapHeight = store.currentMap.height;
        // layer width based on map width
        let mapWidth = store.currentMap.width;
        // dataArray is array of layer data represent in integers.
        let dataArray = [];
        // create data array based on the map's width and height.
        for(let i = 0; i < (mapHeight * mapWidth); i++){
            dataArray.push(0);
        }
        // id of new layer starting from 1 then increment by 1 as new layer created
        let layerID = layers.length + 1;
        let newLayer = {data: dataArray, height: mapHeight, id: layerID, name: `Untitled ${layerID}`, opacity: 1, type: "tilelayer", visible: true, width: mapWidth, x: 0, y: 0};
        layers.push(newLayer);
        clearAllTransactions();
        setRenderLayer(true);
    }
    // delete a layer
    function deleteLayer(index){
        console.log("number of layers before delete: " + layers.length);
        let arrLength = layers.length;
        layers.splice(index, 1) // remove layer at index
        if(arrLength - 1 === layers.length){
            console.log("number of layers after delete: " + layers.length);
            console.log(layers);
            clearAllTransactions();
            setRenderLayer(true);
            draw();     // redraw the layers after a layer is remove
        }
    }
    // move a layer up
    function moveLayerUp(currentIndex){
        // boundary check since you can't move index 0 element to -1
        if(currentIndex != 0){
            console.log("before move up: ");
            console.log(layers);
            let arrLength = layers.length;
            let oldPosition = layers.splice(currentIndex, 1); // return array of remove layer
            if(arrLength - 1 === layers.length){
                layers.splice(currentIndex-1, 0, oldPosition[0]); // move the layer to the front
                if(arrLength === layers.length){
                    console.log("after move up: ")
                    console.log(layers);
                    clearAllTransactions();
                    setRenderLayer(true);
                    draw();     // redraw the layers after a layer is remove
                }
            }
        }
    }
    // move a layer down
    function moveLayerDown(currentIndex){
        // boundary check since you can't move out of the array
        if(currentIndex+1 != layers.length){
            let arrLength = layers.length;
            let oldPosition = layers.splice(currentIndex, 1); // return array of remove layer
            if(arrLength - 1 === layers.length){
                layers.splice(currentIndex+1, 0, oldPosition[0]); // move the layer to the back
                if(arrLength === layers.length){
                    clearAllTransactions();
                    setRenderLayer(true);
                    draw();     // redraw the layers after a layer is remove
                }
            }
        }
    }
    // set layer opacity     *** old function
    // function toggleLayerOpacity(currentIndex){
    //     let currentLayer = layers[currentIndex];
    //     let currentLayerOpacity = currentLayer.Opacity;
    //     if(currentLayerOpacity === 1){
    //         currentLayer.Opacity = 0;
    //     }
    //     else{
    //         currentLayer.Opacity = 1;
    //     }
    //     console.log(currentLayer.Opacity);
    //     setRenderLayer(true);
    //     draw();     // redraw the layers after a layer's opacity is changed
    // }
    // set layer visible
    function toggleLayerVisible(currentIndex){
        let currentLayer = layers[currentIndex];
        let currentLayerVisible = currentLayer.visible;
        currentLayer.visible = !currentLayer.visible;  // change false -> true || true -> false
        console.log(currentLayer.visible);
        setRenderLayer(true);
        draw();     // redraw the layers after a layer's opacity is changed
    }

    // change name of the layer
    function changeLayerName(currentIndex, newName){
        let currentLayer = layers[currentIndex];
        currentLayer.name = newName;
        setRenderLayer(true);
        draw();     // redraw the layers after a layer's name is changed
    }
    // import Tileset
    function importTileset(event){
        try{
            const reader = new FileReader();
            reader.addEventListener("load", ()=> {
                var importImage = "";
                importImage = reader.result;
                // console.log(importImage);

                // reading information of the imported new image
                var newImg = new Image();
                newImg.src = importImage;
                newImg.onload = function(){   // after the image is load, execute the following lines
                    // check if the tileset was imported
                    for(let i = 0; i < tilesets.length; i++){
                        let currentTileset = tilesets[i];
                        if(currentTileset.source === newImg.src){
                            return;
                        }
                    }
                    if(tilesets.length === 0){
                        imageRef.current.src = importImage;
                    }
                    let imgHeight = newImg.height;  // image height
                    let imgWidth = newImg.width;    // image width
                    console.log("printing imported tileset information")
                    console.log(tilesets);
                    console.log("Image height: " + imgHeight);
                    console.log("Image width: " + imgWidth);
                    // getting information for the 
                    let columns = Math.floor(imgWidth / store.currentMap.tilewidth);    // replace 32 by the store.currentMap.tilewidth if changes made in future.
                    let firstgid = 1;
                    if(tilesets.length !== 0){ // has previous imported tilesets
                        firstgid = tilesets[tilesets.length-1].firstgid + tilesets[tilesets.length-1].tilecount;
                        console.log("new first gid: " + firstgid);
                    }
                    let imageName = `image${tilesets.length+1}.png`
                    let tilesetName = `tileset${tilesets.length+1}`
                    let newTileset = {
                        columns: columns, 
                        firstgid: firstgid, 
                        image: imageName, 
                        imageheight: imgHeight, 
                        imagewidth: imgWidth, 
                        margin: 0, 
                        name: tilesetName, 
                        spacing: 0, 
                        tilecount: Math.floor(((imgHeight * imgWidth) / (store.currentMap.tilewidth * store.currentMap.tileheight))), // change 32 * 32 to store.currentMap.tilewidth * store.currentMap.tileheight
                        tileheight: store.currentMap.tileheight, // change 32 to store.currentMap.tileheight
                        tilewidth: store.currentMap.tilewidth, // change 32 to store.currentMap.tilewidth
                        source: importImage
                    }
                    // add tileset to the image array
                    tilesetsImageObject[tilesetsImageObject.length] = new Image();
                    tilesetsImageObject[tilesetsImageObject.length - 1].src = importImage;
                    tilesets.push(newTileset);

                    // setting tilesetMap
                    let values = tilesets.length - 1;
                    for(let i = firstgid; i < firstgid + Math.floor(((imgHeight * imgWidth) / (store.currentMap.tilewidth * store.currentMap.tileheight))); i++){
                        tilesetMap.set(i.toString(), values.toString());
                    }

                    console.log("hi fi called once?");
                    console.log(tabvalue);
                    setRenderTileset(true);
                    draw();
                }
                // columns:    {type: Number}, // num of col in tileset
                // firstgid:   {type: Number}, // ID corresponding to the first tile in the set
                // image:      {type: String}, // image name.png
                // imageheight:{type: Number}, // height of source image in pixels
                // imagewidth: {type: Number}, // width of source image in pixels
                // margin:     {type: Number}, // 0
                // name:       {type: String}, // name of tileset
                // spacing:    {type: Number}, // 0
                // tilecount:  {type: Number}, // number of tiles in the tileset
                // tileheight: {type: Number}, // 32
                // tilewidth:  {type: Number}, // 32
                // source:     {type: String}, // image src
            })
            if(event.target.files && event.target.files[0]){
                reader.readAsDataURL(event.target.files[0]);
            }
        }catch(err){
            console.log(err);
        }
    }
    // import Map json file
    function importMap(event){
        // try{
        //     const reader = new FileReader();
        //     reader.addEventListener("load", ()=> {
        //         let importedMap = "";
        //         importedMap = reader.result;
        //         // remove prefix
        //         let output = importedMap.slice('data:application/json;base64,'.length);
        //         // decoding
        //         var b = Buffer.from(output, 'base64')
        //         let decode = b.toString();
        //         // parsing the decode json
        //         let layersArray = JSON.parse(decode);
                


        //         // find the imported layers
        //         let importedLayers = layersArray.layers;
        //         console.log(importedLayers);
        //         // empty old array
        //         layers.splice(0, layers.length);
        //         // insert layer
        //         for(let i = 0; i < importedLayers.length; i++){
        //             // remove _id field
        //             delete importedLayers[i]._id;
        //             console.log(importedLayers[i]);
        //             layers.push(importedLayers[i]);
        //         }



        //         // find the imported tilesets
        //         let importedTilesets = layersArray.tilesets;
        //         console.log(importedTilesets);
        //         // empty old array
        //         tilesets.splice(0, tilesets.length);
        //         // insert tilesets
        //         for(let i = 0; i < importedTilesets.length; i++){
        //             // remove _id field
        //             delete importedTilesets[i]._id;
        //             tilesets.push(importedTilesets[i]);
        //         }


        //         // emtpy old map
        //         tilesetMap.clear();
        //         // empty old array
        //         tilesetsImageObject.splice(0, tilesetsImageObject.length);
        //         //
        //         // copy the image of tileset
        //         for(let i = 0; i < tilesets.length; i++){
        //             tilesetsImageObject[i] = new Image();
        //             tilesetsImageObject[i].src = tilesets[i].source;
        //             // setting tilesetMap
        //             for(let m = tilesets[i].firstgid; m < tilesets[i].firstgid + tilesets[i].tilecount; m++){
        //                 tilesetMap.set(m.toString(), i.toString());
        //             }
        //         }
        //         // set current Image
        //         if(tilesetsImageObject.length !== 0){
        //             imageRef.current.src = tilesetsImageObject[0].src;
        //         }

        //         // store.importMapJson(id, layers, source, tilesets, nextlayerid, height, width);
        //         store.importMapJson(store.currentMap._id, layersArray.layers, layersArray.Previewed, layersArray.tilesets, layersArray.nextlayerid, layersArray.height, layersArray.width);
        //         // lazy implementation
        //         // history.push('/home');
        //         store.loadHomeScreen(store.currentMap._id);
        //         alert("Closed current map and reinitialized");
        //         // store.loadMapPage(store.currentMap._id);


        //         // setRenderLayer(true);
        //         // setRenderTileset(true);
        //         // draw();
        //     })
        //     if(event.target.files && event.target.files[0]){
        //         reader.readAsDataURL(event.target.files[0]);
        //     }
        // }catch(err){
        //     console.log(err);
        // }
    }

    const onExportAsPNG = async (event) =>{
        event.preventDefault();
        if (!canvas || !canvas.current){
            return;
        }

        // 
        var ctx = canvas.current.getContext("2d");
        // ctx.globalCompositeOperation = 'destination-over'
        // clear drawing from the canvas first
        ctx.clearRect(-10, -10, store.currentMap.width*store.currentMap.tilewidth *10, store.currentMap.height*store.currentMap.tileheight *10);
     
        var size_of_crop = 32;

        if(isZoom===true){
            ctx.scale(scale, scale);
            isZoom=false
        }
        // let dragCoordinate = [0, 0];
        // let newCoordinate = [0, 0];
        ctx.translate(newCoordinate[0]-oldCoordinate[0], newCoordinate[1]-oldCoordinate[1]);

        // draw by layers
        for(let i = 0; i < layers.length; i++){
            let currentLayer = layers[i]; //currentLayer
            if(currentLayer.visible){  // it is visible
                let layerInform = currentLayer.data;  // array of the layer
                let mapWidth = store.currentMap.width;
                let mapHeight = store.currentMap.height;
                let layerX = 0;
                let layerY = 0;
                // looping through the layer's data 
                for(let j = 0; j < layerInform.length; j++){
                    let thisgid = layerInform[j];
                    // since it is empyt, don't draw
                    if(thisgid === 0){
                        layerX++;
                        if(layerX === mapWidth){
                            layerX = 0;
                            layerY++;
                        }
                        continue;
                    }


                    ///----------------new mapping drawing O(1) method
                    else{
                        let wantedIndex = tilesetMap.get(thisgid.toString());
                        let wantedIndexNum = Number(wantedIndex);
                        let currentTilesetToDraw = tilesets[wantedIndexNum];   // tileset
                        let firstgid = currentTilesetToDraw.firstgid; // first gid
                        let tilesetColumns = currentTilesetToDraw.columns; // number of columns
                        let gidPostion = thisgid - firstgid;
                        let imgX = gidPostion % tilesetColumns;  // tileset x position
                        let imgY = Math.floor(gidPostion / tilesetColumns);  // tileset y position
                        ctx.drawImage(
                            tilesetsImageObject[wantedIndexNum],
                            imgX * 32,
                            imgY * 32,
                            size_of_crop,
                            size_of_crop,
                            layerX * 32,
                            layerY * 32,
                            size_of_crop,
                            size_of_crop
                        );
                    }

                    // keep in track of x and y coordinates of the current Layer
                    layerX++;
                    if(layerX === mapWidth){
                        layerX = 0;
                        layerY++;
                    }
                }
            }
        }
      


        // Get name
        const link = document.createElement('a');
        if(store.currentMap){
            link.download = `${store.currentMap.Name}.png`;
        }
        else{
            link.download = `guestUntitled.png`;
        }
        link.href = canvas.current.toDataURL();
        //link.href = canvas.getImage({rect: imageBounds}).toDataURL();
        link.click();
        //link.delete;
        //const w = window.open("");
        //w.document.write(image.outerHTML);
        draw();
        return;
    }

    const onExportAsJson = async (event) =>{
        event.preventDefault();
        
        if(store.currentMap){
            let response = await api.getMapById(store.currentMap._id);
                if(response.data.success){
                    let map = response.data.map;
                    console.log(map);
                    console.log("pri")
                    let dataStr = JSON.stringify(map);
                    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                    let exportFileDefaultName = `${store.currentMap.Name}.json`;
                    let linkElement = document.createElement('a');
                    linkElement.setAttribute('href', dataUri);
                    linkElement.setAttribute('download', exportFileDefaultName);
                    linkElement.click();
                    let tilesetsArrayExport = map.tilesets;
                    for(let i = 0; i < tilesetsArrayExport.length; i++){
                        // // Get name
                        let link = document.createElement('a');
                        link.download = tilesetsArrayExport[i].image; // name of the image
                        link.href = tilesetsArrayExport[i].source;
                        link.click();
                        // link.href = 
                        // if(store.currentMap){
                        //     link.download = `${store.currentMap.Name}.png`;
                        // }
                        // else{
                        //     link.download = `guestUntitled.png`;
                        // }
                        // link.href = canvas.current.toDataURL();
                    }
                }
        }

        // let jsonData = layers;
        // let dataStr = JSON.stringify(jsonData);
        // let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

        // let exportFileDefaultName = `${store.currentMap.Name}.json`;

        // let linkElement = document.createElement('a');
        // linkElement.setAttribute('href', dataUri);
        // linkElement.setAttribute('download', exportFileDefaultName);
        // linkElement.click();
    }

    const onSave = async (event) => {
        if (!canvas){
            return;
        }
        try{
            //console.log("URL: " + typeof imgData);
            await store.updateMapLayer(store.currentMap._id, layers, canvas.current.toDataURL(), tilesets, layers.length+1);
        }
        catch(err){
            console.log(err);
        }
    }

    function handleErase(){
        // if it is erase move, pan move mode not working
        // if(erase){
        //     setPanMove(false);
        // }
        seterase(!erase);

        setPanMove(false);
        // seterase(erase);
    }

    function handlePanMove(){
        // if(panMove){
        //     seterase(false);
        // }
        setPanMove(!panMove);
        seterase(false);
        // setPanMove(panMove);
    }

    // const  handlePublishMap= async (event) => {
    //     await store.publishMap(store.currentMap._id, " ");
    // }

    const setHasSourceFunction = (bools) => {
        setHasSource(bools);
    }
    const setNotPublishFunction = () => {
        setIsPublish(false);
    }
    const setPublishDescriptionFunction = (text) => {
        store.publishMap(store.currentMap._id, text);
        setIsPublish(false);
    }

    const handlePublishMap = async event => {
        if(store.currentMap){
            if(auth.user.email !== store.currentMap.OwnerEmail){
                alert("you can't publish other user's work");
                return;
            }
            let response = await api.getMapById(store.currentMap._id);
            if(response.data.success){
                let mapSource = response.data.map.Source;
                if(mapSource !== ""){
                    setIsPublish(true);
                }
                else{
                    setHasSourceFunction(true);
                }
            }
        }
    }

    const onShare = async () =>{
        // check if share is the owner
        if(auth.user.email !== store.currentMap.OwnerEmail){
            alert("you can't share other user's work");
            return;
        }
        setIsShare(true);
    }

    const cancelShare = async () =>{
        setIsShare(false);
    }

    const shareProject = async (id, email) =>{
        await store.shareMap(id, email);
    }

    let layerList = "";
    let current_map;
    if(layers.length != 0){
        current_map = layers;
        layerList = 
            <List style={{ overflowY: 'scroll', maxHeight:180,minHeight:100,minWidth:300,maxWidth:300, padding: 0}}>
                {
                    current_map.map((element, index) => (
                        <LayerCard
                            setLayer = {setLayer}
                            moveLayerUp = {moveLayerUp}
                            moveLayerDown = {moveLayerDown}
                            deleteLayer = {deleteLayer}
                            toggleLayerVisible = {toggleLayerVisible}
                            changeLayerName = {changeLayerName}
                            currentLayer = {currentLayer}
                            lastLayerIndex = {layers.length-1}
                            pairs={{position: index, value: element}}
                            selected={false}
                        />
                    ))
                }
            </List>;
    }else{
        layerList = 
            <List style={{ overflowY: 'scroll', maxHeight:100,minHeight:100,minWidth:300,maxWidth:300, padding: 0}}>
                {
                    
                }
            </List>;
    }
    // trigger render layer
    if(renderLayer){
        console.log("re-renderLayer");
        setRenderLayer(false);
        
        console.log(layers);
        if(layers){  // prevent running empty
            console.log("ohye")
            console.log(layers);
            layerList = 
            <List style={{ overflowY: 'scroll', maxHeight:100,minHeight:100,minWidth:300,maxWidth:300, padding: 0}}>
                {
                    layers.map((element, index) => (
                        <LayerCard
                            setLayer = {setLayer}
                            moveLayerUp = {moveLayerUp}
                            moveLayerDown = {moveLayerDown}
                            deleteLayer = {deleteLayer}
                            toggleLayerVisible = {toggleLayerVisible}
                            changeLayerName = {changeLayerName}
                            currentLayer = {currentLayer}
                            lastLayerIndex = {layers.length-1}
                            pairs={{position: index, value: element}}
                            selected={false}
                        />
                    ))
                }
            </List>;
        }
        else{
            layerList = "";
        }
    }


    //chengzhi tileset
    // let tilesetList = ["https://assets.codepen.io/21542/TileEditorSpritesheet.2x_2.png","https://assets.codepen.io/21542/TileEditorSpritesheet.2x_2.png", "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"]
    const handleTabChange = (event, newValue) => {
        setTabvalue(newValue);
        console.log("new tabvalue: " + newValue);
        // reset the tileset
        setTilesetCurrentGID(0);
        // using new value to set the current image source
        imageRef.current.src = tilesets[newValue].source;
        // console.log(tilesetContainer.current);
        // // removing the style icon
        // tilesetContainer.current.style.removeProperty('left');
        // tilesetContainer.current.style.removeProperty('top');
        // console.log(tilesetContainer.current);
    };
    function saidHello(){
        console.log("Hello my tab");
    }
    let tilesetTab = "";
    if(tilesets.length !== 0){
        tilesetTab = 
            <Tabs
                value={tabvalue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
            >
                {
                    tilesets.map((element, index) => (
                        <Tab
                            onClick = {saidHello}
                            label={`tileset${index}`}
                        />
                    ))
                }
            </Tabs>
    } 
    if(renderTileset){
        setRenderTileset(false);
        tilesetTab = 
            <Tabs
                value={tabvalue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
            >
                {
                    tilesets.map((element, index) => (
                        <Tab
                            onClick = {saidHello}
                            label={`tileset${index}`}
                        />
                    ))
                }
            </Tabs>
    }

    //chengzhi tileset
    
    //zoom in
    function handleZoomIn(){
        // setscale(scale/0.8);
        scale=1
        scale/=0.8
        setscale2(scale2/0.8)
        // scale2/=0.8
        isZoom=true
        draw()
    }
    
    function handleZoomOut(){
        //setscale(scale*0.8);
        scale=1
        scale*=0.8
        setscale2(scale2*0.8)
        isZoom=true
        draw()
    }

    let mapPage = 
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
            <ShareModal 
                isShare = {isShare} 
                name = {store.currentMap.Name}
                id = {store.currentMap._id}
                cancelShare = {cancelShare}
                shareProject = {shareProject}
            />
            <div className='right-screen'>
                <div className="map">
                    <div className="mapbanner">
                        <Button onClick = {onSave}>Save</Button>
                        {/* <Button onClick={importMap} component="label">Import Map<input type="file" id="jsonfileinput" hidden onChange={importMap}/></Button> */}
                        <div className='dropdown'>
                        <Button className='dropbtn'>Export
                            <div className="dropdown-content">
                                <a href="#" onClick = {onExportAsPNG} >Export as PNG</a>
                                <a href="#" onClick = {onExportAsJson} >Export as Json</a>
                            </div>
                        </Button>
                        </div>
                        <Button onClick={handlePublishMap} >Publish</Button>
                        <Button onClick={onShare}>Share</Button>
                    </div>
                    <div className="card">
                        <div className="Editbar">
                        {/* <IconButton><ArrowOutwardIcon></ArrowOutwardIcon></IconButton>
                        <IconButton><ModeEditOutlineIcon></ModeEditOutlineIcon></IconButton> */}
                        <IconButton onClick={handleErase}><EditOffIcon style={{borderColor: erase===true ? 'blue' : 'white',borderStyle: "solid"}}></EditOffIcon></IconButton>
                        <IconButton onClick={handleUndo}><UndoIcon></UndoIcon></IconButton>
                        <IconButton onClick={handleRedo}><RedoIcon></RedoIcon></IconButton>
                        <IconButton onClick={handleZoomIn}><ZoomInIcon/></IconButton>
                        <IconButton onClick={handleZoomOut}><ZoomOutIcon/></IconButton>
                        <IconButton onClick={handlePanMove}> <ControlCameraIcon style={{borderColor: panMove===true ? 'blue' : 'white',borderStyle: "solid"}}/></IconButton>
                        </div>
                        <div className="card_center-column">
                            <canvas 
                            id="canvas_body"
                            ref={canvas} 
                            style={styles}  
                            width="800" 
                            height="640"
                            onMouseDown={handleCanvasMouseDown}
                            onMouseUp={handleCanvasMouseUp}
                            onMouseLeave={handleCanvasMouseLeave}
                            onMouseMove={handleCanvasMouseMove}
                            >
                            </canvas>
                        </div>
                        <Box id="map-right">
                            <Box id="layer-box">
                                <label style={{color: "black"}}>Layer: </label>
                                <IconButton onClick={createLayer}><AddIcon/></IconButton>
                                <Box id="layers">
                                    {
                                        layerList
                                    }
                                </Box>
                            </Box>
                            <Box id="tileset-box">
                             
                                <label style={{color: "black"}}>Tileset: </label>
                                {/* <Button onClick={importTileset} component="label">Import Tileset<input type="file"hidden onChange={importTileset}/></Button> */}
                                <IconButton onClick={importTileset} component="label"><AddIcon/> <input type="file"hidden onChange={importTileset}/></IconButton>
                                <Box id="tileset-tabs">
                                {tilesetTab}
                                </Box>
                                <Box id="tileset-container" 
                                    ref={tilesetContainer} 
                                    onMouseDown={handleTilesetContainerMouseDown}
                                    >
                                        <img id="tileset-source" 
                                         crossOrigin="anonymous" 
                                         ref={imageRef}
                                        //  onLoad={handleImageOnLoad}
                                        // src = {tilesets[tabvalue]}
                                        />
                                        <div className="tileset-container_selection" ref={tilesetSelection}></div>
                                </Box>
                            </Box>
                        </Box>
                    </div>
                </div>
            </div>
        </div>

    return (
        <div className='outer-screen'>
            {mapPage}
        </div>
    )
}