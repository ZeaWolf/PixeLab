
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

export default function MapScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

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
    const [erase,setErase] = useState(false);
    const history = useHistory();

    useEffect(() => {
        history.push('/map')
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
        
        layers.forEach((layer) => {
            Object.keys(layer).forEach((key) => {
                //Determine x/y position of this placement from key ("3-4" -> x=3, y=4)
                var positionX = Number(key.split("-")[0]);
                var positionY = Number(key.split("-")[1]);
                //   var [tilesheetX, tilesheetY] = layer[key];
                var layerTileSrc = layer[key];
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
        });
     }

    // add tile to the layers
    function addTile(mouseEvent) {
        if(layers.length !== 0 && tilesetSrc !== ""){
            var clicked = getCoords(mouseEvent);
            var key = clicked[0] + "-" + clicked[1];
            console.log(clicked[0]);
            console.log(clicked[1]);
        
            if (mouseEvent.shiftKey) {
            delete layers[currentLayer][key];
            } else {
                layers[currentLayer][key]=tilesetSrc;
            }
            console.log(layers);
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
        layers.push({});
        console.log("number of layers after create: " + layers.length);
        console.log(layers);
        setRenderLayer(true);
    }
    // delete a layer
    function deleteLayer(index){
        console.log("number of layers before create: " + layers.length);
        layers.splice(index, 1) // remove layer at index
        console.log("number of layers after create: " + layers.length);
        console.log(layers);
        setRenderLayer(true);
        draw();     // redraw the layers after a layer is remove
    }
    // move a layer up
    function moveLayerUp(currentIndex){
        // boundary check since you can't move index 0 element to -1
        if(currentIndex != 0){
            console.log("before move up: ");
            console.log(layers);
            let oldPosition = layers.splice(currentIndex, 1); // return array of remove layer
            layers.splice(currentIndex-1, 0, oldPosition[0]); // move the layer to the front
            console.log("after move up: ")
            console.log(layers);
            setRenderLayer(true);
            draw();     // redraw the layers after a layer is remove
        }
    }
    // move a layer down
    function moveLayerDown(currentIndex){
        // boundary check since you can't move out of the array
        if(currentIndex+1 != layers.length){
            let oldPosition = layers.splice(currentIndex, 1); // return array of remove layer
            layers.splice(currentIndex+1, 0, oldPosition[0]); // move the layer to the back
            setRenderLayer(true);
            draw();     // redraw the layers after a layer is remove
        }
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
            await store.updateMapLayer(store.currentMap._id, layers);
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
            setErase(true);
        }else{
            setErase(false);
        }
        
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
                            currentLayer = {currentLayer}
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
            <div className='right-screen'>
                <div className="map">
                    <div className="mapbanner">
                        <Button>New</Button>
                        <Button onClick = {onSave}>Save</Button>
                        <Button onClick={importTileset} component="label">Import Tileset<input type="file"hidden onChange={importTileset}/></Button>
                        <Button>Import Map</Button>
                        <Button onClick={onExport}>Export</Button>
                        <Button>Publish</Button>
                        <Button>Share</Button>
                    </div>
                    <div className="card">
                        <div className="card_center-column">
                            <canvas 
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