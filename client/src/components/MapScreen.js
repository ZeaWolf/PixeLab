
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
    const [matrix, setMatrix] = useState(Array.from({length: 20},()=> Array.from({length: 25}, () => "777")));
    const tilesetSelection = useRef(null);
    const canvas = useRef(null);
    const tilesetContainer = useRef(null);
    const imageRef = useRef(null);  
    let currentLayer = 0;
    const [layers, setLayers] = useState(store.currentMap.Layers);
    var tilesetSrc = "";     // store the selected tile source type
    var isMouseDown = false;
    var selection = [0, 0];
    const [erase,setErase] = useState(false);

    const history = useHistory();

    useEffect(() => {
        history.push('/map')
    }, []);

    const styles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgb(235, 225, 225)"
    };


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


        function addTile(mouseEvent) {
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
            draw();
        }
        if(true){
            tilesetContainer.current.addEventListener("mousedown", (event) => {
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
            });
            canvas.current.addEventListener("mousedown", (event) => {
                console.log("QAQ onClick");
                if(layers){
                    console.log(layers);
                }
                console.log(event);
                event.stopPropagation();
                isMouseDown = true;
                addTile(event);
            });
            canvas.current.addEventListener("mouseup", () => {
                isMouseDown = false;
            });
            canvas.current.addEventListener("mouseleave", () => {
                isMouseDown = false;
            });
            //  canvas.current.addEventListener("mousedown", addTile);
            canvas.current.addEventListener("mousemove", (event) => {
                event.stopPropagation();
                if (isMouseDown) {
                addTile(event);
                }
            });
        }

        function getCoords(e) {
            const { x, y } = e.target.getBoundingClientRect();
            const mouseX = e.clientX - x;
            const mouseY = e.clientY - y;
            return [Math.floor(mouseX / 32), Math.floor(mouseY / 32)];
        }

        function draw() {  // this is the onload function to render all layer
            var ctx = canvas.current.getContext("2d");
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

        imageRef.current.onload = function() {
        // layers = defaultState;
            draw();
            // setLayer(0);
        }

        imageRef.current.src = "https://assets.codepen.io/21542/TileEditorSpritesheet.2x_2.png"
    }
    function setLayer(event){

        let newLayer = Number(event.target.getAttribute("tile-layer"));

        //Update the layer
        currentLayer = newLayer;
        console.log("this is  new layer;---------------------"+newLayer);
        //Update the UI to show updated layer
        var oldActiveLayer = document.querySelector(".layer.active");
        if (oldActiveLayer) {
           oldActiveLayer.classList.remove("active");
        }
    }
    
    function importTileset(event){
        const reader = new FileReader();
        reader.addEventListener("load", ()=> {
            var importImage = "";
            importImage = reader.result;
            imageRef.current.src = importImage;
        })
        if(event.target.files && event.target.files[0]){
            reader.readAsDataURL(event.target.files[0]);
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
    function handleCreateLayer(){
        store.updateLayer();
    }

    function handleErase(){
        if(erase === false){
            setErase(true);
        }else{
            setErase(false);
        }
        
    }

    let layerList = "";
    var current_map;
    if(store.currentMap === null){
        layerList = 
            <List style={{ overflowY: 'scroll', maxHeight:100,minHeight:100,minWidth:300,maxWidth:300, padding: 0}}>
                {
                    
                }
            </List>;
    }else{
        current_map = store.currentMap.Layers;
        layerList = 
            <List style={{ overflowY: 'scroll', maxHeight:100,minHeight:100,minWidth:300,maxWidth:300, padding: 0}}>
                {
                    current_map.map((pair) => (
                        <LayerCard
                            key={pair._id}
                            pairs={{map:pair, key:pair._id}}
                            selected={false}
                        />
                    ))
                }
            </List>;
    }
    

    const  mapPage = 
        <div className='full-screen'>
            <NavigationBar/>
            <div className='right-screen'>
                <div className="map">
                    <div className="mapbanner">
                        <Button>New</Button>
                        <Button onClick = {onSave}>Save</Button>
                        <Button onClick={importTileset} component="label">Import <input type="file"hidden onChange={importTileset}/></Button>
                        <Button onClick={onExport}>Export</Button>
                        <Button>Publish</Button>
                        <Button>Share</Button>
                    </div>
                    <div className="card">
                        <div className="card_center-column">
                            <canvas ref={canvas} style={styles}  width="800%" height="640%">
                            </canvas>
                            {/* <script> {initializeCanvas()} </script> */}
                        </div>
                        <div className="card_body">
                            <div className="card_body_2">

                                <label style={{color: "black"}}>Layer: </label>
                                <IconButton><AddIcon onClick={handleCreateLayer}/></IconButton>
                                <IconButton><AutoFixNormalIcon onClick={handleErase}/></IconButton>
                                <div className="layers">
                                    
                                    {
                                        layerList
                                    }
                                    {/* <li><button className="layer" onClick={setLayer} tile-layer="0">Layer 1</button></li>
                                    <li><button className="layer" onClick={setLayer} tile-layer="1">Layer 2</button></li>
                                    <li><button className="layer" onClick={setLayer} tile-layer="2">Layer 3</button></li> */}
                                </div>
                                <aside>
                                    <label style={{color: "black"}}>Tileset: </label>
                                    <div className="tileset-container" ref={tilesetContainer} >
                                        <img id="tileset-source" crossorigin="anonymous" ref={imageRef}/>
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