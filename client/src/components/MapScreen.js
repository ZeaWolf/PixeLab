
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

export default function MapScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [hasSource, setHasSource] = useState(false);
    const [isPublish, setIsPublish] = useState(false);
    const [isShare, setIsShare] = useState(false);

    // below 4 are reference to the html object.
    const tilesetSelection = useRef(null);
    const canvas = useRef(null);
    const tilesetContainer = useRef(null);
    const imageRef = useRef(null);  
    const [currentLayer, setCurrentLayer] = useState(0);
    // check if there is a default image
    const [defaultImage, setDefaultImage] = useState(false);

    // const [layers, setLayers] = useState(store.currentMap.Layers);
    let layers = [];
    let tilesetSrc = "";     // store the selected tile source type
    let isMouseDown = false;
    const [renderLayer, setRenderLayer] = useState(true);    // if true, the layer editor will re-render
    let selection = [-1, -1];
    let erase = false;
    const history = useHistory();

    useEffect(() => {
        let url = window.location.href;
        let indexBeforeURL = url.lastIndexOf("/");
        let loadingListID = url.substring(indexBeforeURL+1);
        // store.loadMapPage(loadingListID);
        history.push(`/map/${loadingListID}`);

        return ( ()=>{
            store.leaveMapPage(store.currentMap._id);
         });
    }, []);

    if(store.currentMap){
        layers = store.currentMap.Layers;
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
    // draw the layer
    function draw() {  // this is the onload function to render all layer
        var ctx = canvas.current.getContext("2d");
        // clear drawing from the canvas first
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
     
        var size_of_crop = 32;

        for(let i = 0; i < layers.length; i++){
            let currentLayer = layers[i];
            if(currentLayer.Opacity === 1){   // draw if it is visible
                let layerInform = currentLayer.Layer   // where store the actual layer key and value
                Object.keys(layerInform).forEach((key) => {
                    // //Determine x/y position of this placement from key ("3-4" -> x=3, y=4)
                    var positionX = Number(key.split("-")[0]);
                    var positionY = Number(key.split("-")[1]);
                    //   Image is the key's value
                    var layerTileSrc = layerInform[key];
                    const img = new Image();
                    img.src = layerTileSrc;
                    ctx.drawImage(
                        img,
                        0 * 32,
                        0 * 32,
                        size_of_crop,
                        size_of_crop,
                        positionX * 32,
                        positionY * 32,
                        size_of_crop,
                        size_of_crop
                    );
                });
            }
        }
     }

    // add tile to the layers
    function addTile(mouseEvent) {
        if(layers.length !== 0 && tilesetSrc !== ""){
            var clicked = getCoords(mouseEvent);
            var key = clicked[0] + "-" + clicked[1];
            console.log(clicked[0]);
            console.log(clicked[1]);
            
            // if (mouseEvent.shiftKey) {
            // no update immed, choose reverse value
            if(erase) {
                delete layers[currentLayer].Layer[key];
            } else {
                layers[currentLayer].Layer[key]=tilesetSrc;
            }
            console.log(layers[currentLayer].Layer);
            console.log("currentlayer:-------------------------------"+currentLayer);
        }
        draw();
    }
    // canvas mouse down
    function handleCanvasMouseDown(event){
        console.log("QAQ onClick");
        if(layers){
            console.log(layers);
        }
        isMouseDown = true;
        addTile(event);
    }
    // canvas mouse up
    function handleCanvasMouseUp(event){
        isMouseDown = false;
    }
    // canvas mouse leave
    function handleCanvasMouseLeave(event){
        isMouseDown = false;
    }
    // canvas mouse move
    function handleCanvasMouseMove(event){
        event.stopPropagation();
        if (isMouseDown) {
            addTile(event);
        }
    }
    // tilset container mouse down
    function handleTilesetContainerMouseDown(event){
        selection = getCoords(event);

        // create the highlight box to indicated the location of tile
        tilesetSelection.current.style.left = selection[0] * 32 + "px";
        tilesetSelection.current.style.top = selection[1] * 32 + "px";

        // save the selected tile source which is the dataURL string
        // create canvas then the tile information to the tilesetSrc
        let canvas2 = document.createElement('canvas');
        canvas2.width = 32; // 
        canvas2.height = 32; //
        let context = canvas2.getContext('2d');
        context.drawImage(
            imageRef.current,
            selection[0] * 32,
            selection[1] * 32,
            32,
            32,
            0 * 32,
            0 * 32,
            32,
            32,
        );
        tilesetSrc = canvas2.toDataURL();
    }
    // image on load
    function handleImageOnLoad(){
        draw();
    }


    if(imageRef.current && tilesetSelection && canvas && tilesetContainer && store.currentMap){
        console.log("being called");
        // var layers = [
        //     //Bottom
        //     {
        //        //Structure is "x-y": ["tileset_x", "tileset_y"]
        //        //EXAMPLE: "1-1": [3, 4],
        //     },
        //     //Middle
        //     {},
        //     //Top
        //     {}
        //  ];

        imageRef.current.onload = function() {
            draw();
        }

        if(!defaultImage){
            imageRef.current.src = "https://assets.codepen.io/21542/TileEditorSpritesheet.2x_2.png"
            setDefaultImage(true);
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
        console.log("number of layers before create: " + layers.length);
        // layers.push({});
        let newLayer = {Name: "Untitled", Opacity: 1, Layer:{}};
        layers.push(newLayer);
        console.log("number of layers after create: " + layers.length);
        console.log(layers);
        setRenderLayer(true);
    }
    // delete a layer
    function deleteLayer(index){
        console.log("number of layers before create: " + layers.length);
        let arrLength = layers.length;
        layers.splice(index, 1) // remove layer at index
        if(arrLength - 1 === layers.length){
            console.log("number of layers after create: " + layers.length);
            console.log(layers);
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
                    setRenderLayer(true);
                    draw();     // redraw the layers after a layer is remove
                }
            }
        }
    }
    // set layer opacity
    function toggleLayerOpacity(currentIndex){
        let currentLayer = layers[currentIndex];
        let currentLayerOpacity = currentLayer.Opacity;
        if(currentLayerOpacity === 1){
            currentLayer.Opacity = 0;
        }
        else{
            currentLayer.Opacity = 1;
        }
        console.log(currentLayer.Opacity);
        setRenderLayer(true);
        draw();     // redraw the layers after a layer's opacity is changed
    }
    // change name of the layer
    function changeLayerName(currentIndex, newName){
        let currentLayer = layers[currentIndex];
        currentLayer.Name = newName;
        setRenderLayer(true);
        draw();     // redraw the layers after a layer's opacity is changed
    }
    
    function importTileset(event){
        try{
            const reader = new FileReader();
            reader.addEventListener("load", ()=> {
                var importImage = "";
                importImage = reader.result;
                imageRef.current.src = importImage;
            })
            if(event.target.files && event.target.files[0]){
                reader.readAsDataURL(event.target.files[0]);
            }
        }catch(err){
            console.log(err);
        }
    }

    const onExport = async (event) =>{
        event.preventDefault();
        if (!canvas || !canvas.current){
            return;
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
        return;
    }

    const onSave = async (event) => {
        if (!canvas){
            return;
        }
        try{
            //console.log("URL: " + typeof imgData);
            await store.updateMapLayer(store.currentMap._id, layers, canvas.current.toDataURL());
        }
        catch(err){
            console.log(err);
        }
    }
    // function handleCreateLayer(){
    //     store.updateLayer();
    // }

    function handleErase(){
        if(erase === false){
            erase = true;
        }else{
            erase = false;
        }
        
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
            <List style={{ overflowY: 'scroll', maxHeight:100,minHeight:100,minWidth:300,maxWidth:300, padding: 0}}>
                {
                    current_map.map((element, index) => (
                        <LayerCard
                            setLayer = {setLayer}
                            moveLayerUp = {moveLayerUp}
                            moveLayerDown = {moveLayerDown}
                            deleteLayer = {deleteLayer}
                            toggleLayerOpacity= {toggleLayerOpacity}
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
        if(current_map){  // prevent running empty
            layerList = 
            <List style={{ overflowY: 'scroll', maxHeight:100,minHeight:100,minWidth:300,maxWidth:300, padding: 0}}>
                {
                    current_map.map((element, index) => (
                        <LayerCard
                            setLayer = {setLayer}
                            moveLayerUp = {moveLayerUp}
                            moveLayerDown = {moveLayerDown}
                            deleteLayer = {deleteLayer}
                            currentLayer = {currentLayer}
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
                        <Button>New</Button>
                        <Button onClick = {onSave}>Save</Button>
                        <Button onClick={importTileset} component="label">Import Tileset<input type="file"hidden onChange={importTileset}/></Button>
                        <Button>Import Map</Button>
                        <Button onClick={onExport}>Export</Button>
                        <Button onClick={handlePublishMap} >Publish</Button>
                        <Button onClick={onShare}>Share</Button>
                    </div>
                    <div className="card">
                        <div className="card_center-column">
                            <canvas 
                            id="canvas_body"
                            ref={canvas} 
                            style={styles}  
                            width="800%" 
                            height="640%"
                            onMouseDown={handleCanvasMouseDown}
                            onMouseUp={handleCanvasMouseUp}
                            onMouseLeave={handleCanvasMouseLeave}
                            onMouseMove={handleCanvasMouseMove}
                            >
                            </canvas>
                        </div>
                        <div className="card_body">
                            <div className="card_body_2">

                                <label style={{color: "black"}}>Layer: </label>
                                <IconButton><AddIcon onClick={createLayer}/></IconButton>
                                <IconButton><AutoFixNormalIcon onClick={handleErase}/></IconButton>
                                <div className="layers">
                                    {
                                        layerList
                                    }
                                </div>
                                <aside>
                                    <label style={{color: "black"}}>Tileset: </label>
                                    <div className="tileset-container" 
                                        ref={tilesetContainer} 
                                        onMouseDown={handleTilesetContainerMouseDown}
                                        >
                                        <img id="tileset-source" 
                                        crossorigin="anonymous" 
                                        ref={imageRef}
                                        onLoad={handleImageOnLoad}/>
                                        <div className="tileset-container_selection" ref={tilesetSelection}></div>
                                    </div>
                                </aside>
                            </div>
                        </div>
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