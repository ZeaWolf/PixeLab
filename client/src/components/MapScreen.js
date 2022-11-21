
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


export default function MapScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [matrix, setMatrix] = useState(Array.from({length: 20},()=> Array.from({length: 25}, () => "777")));
    const tilesetSelection = useRef(null);
    const canvas = useRef(null);
    const tilesetContainer = useRef(null);
    const imageRef = useRef(null);  
    let currentLayer = 0;
    const [layers, setLayers] = useState([{},{},{}]);
    var isMouseDown = false;
    var selection = [0, 0];

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


    if(imageRef.current && tilesetSelection && canvas && tilesetContainer && imageRef.current){
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
                layers[currentLayer][key]=[selection[0], selection[1]];
            }
            console.log(layers);
            console.log("currentlayer:-------------------------------"+currentLayer);
            draw();
        }
        if(true){
            tilesetContainer.current.addEventListener("mousedown", (event) => {
                selection = getCoords(event);
                tilesetSelection.current.style.left = selection[0] * 32 + "px";
                tilesetSelection.current.style.top = selection[1] * 32 + "px";
            });
            console.log("add event listeners");
            console.log("add event listeners");

            canvas.current.addEventListener("mousedown", (event) => {
                console.log("QAQ onClick");
                console.log(event);
                event.stopPropagation();
                isMouseDown = true;
                addTile(event);
                console.log(canvas.current);
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

        function draw() {
            var ctx = canvas.current.getContext("2d");
            ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
         
            var size_of_crop = 32;
            
            layers.forEach((layer) => {
               Object.keys(layer).forEach((key) => {
                  //Determine x/y position of this placement from key ("3-4" -> x=3, y=4)
                  var positionX = Number(key.split("-")[0]);
                  var positionY = Number(key.split("-")[1]);
                  var [tilesheetX, tilesheetY] = layer[key];
         
                  ctx.drawImage(
                     imageRef.current,
                     tilesheetX * 32,
                     tilesheetY * 32,
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
        console.log("whyhwy");
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
    let layerList = "";
    let current_map = store.currentMap.Layers;
    layerList = 
        <List style={{ overflowY: 'scroll', maxHeight:100,minHeight:100, padding: 0}}>
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

    const  mapPage = 
        <div className='full-screen'>
            <NavigationBar/>
            <div className='right-screen'>
                <div className="map">
                    <div className="mapbanner">
                        <Button>New</Button>
                        <Button>Save</Button>
                        <Button onClick={importTileset} component="label">Import <input type="file"hidden onChange={importTileset}/></Button>
                        <Button>Export</Button>
                        <Button>Publish</Button>
                        <Button>Share</Button>
                    </div>
                    <div className="card">
                        <div className="card_center-column">
                            <canvas ref={canvas} style={styles} width="800%" height="640%">
                            </canvas>
                        </div>
                        <div className="card_body">
                            <div className="card_body_2">

                                <label style={{color: "black"}}>Layer: </label>
                                {/* <IconButton><AddIcon onClick={handleCreateLayer}/></IconButton> */}
                                <div className="layers">
                                    
                                    {/* {
                                        layerList
                                    } */}
                                    <li><button className="layer" onClick={setLayer} tile-layer="0">Layer 1</button></li>
                                    <li><button className="layer" onClick={setLayer} tile-layer="1">Layer 2</button></li>
                                    <li><button className="layer" onClick={setLayer} tile-layer="2">Layer 3</button></li>
                                </div>
                                <aside>
                                    <label style={{color: "black"}}>Tileset: </label>
                                    <div className="tileset-container" ref={tilesetContainer}>
                                        <img id="tileset-source" ref={imageRef}/>
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