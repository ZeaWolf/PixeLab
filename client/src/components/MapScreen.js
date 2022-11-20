
import { Fab, Typography, Box, Button } from '@mui/material';
import React, { useContext, useEffect, useState,useRef } from 'react'
import NavigationBar from './NavigationBar'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthContext from '../auth'
import { useHistory } from 'react-router-dom'
// var tilesetContainer = document.querySelector(".tileset-container");
// var tilesetSelection = document.querySelector(".tileset-container_selection");


export default function MapScreen() {
    const { auth } = useContext(AuthContext);
    const [tilesetImage, setTilesetImage] = useState("");
    const [tilesetSelection, setTilesetSelection] = useState("");
    const [tilesetContainer, setTilesetContainer] = useState("");
    const [canvas, setCanvas] = useState("");
    var isMouseDown = false;
    var currentLayer = 0;
    var selection = [0, 0];

    const history = useHistory();

    useEffect(() => {
        // store.closeCurrentList();
        setTilesetImage(document.querySelector("#tileset-source"));
        setTilesetSelection(document.querySelector(".tileset-container_selection"));
        setTilesetContainer(document.querySelector(".tileset-container"));
        setCanvas(document.querySelector("canvas"));

        tilesetImage = document.querySelector("#tileset-source");
        console.log(tilesetImage)
        console.log(tilesetSelection)
        console.log(tilesetContainer)
        console.log(canvas)
        // store.loadMaps();
    }, []);

    const styles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgb(235, 225, 225)"
    };

    // if(!tilesetImage){
    //     history.push("/map")
    // }
    let setLayer = function (layer){
        console.log("test");
    }

    if(tilesetImage){
        var layers = [
            //Bottom
            {
               //Structure is "x-y": ["tileset_x", "tileset_y"]
               //EXAMPLE: "1-1": [3, 4],
            },
            //Middle
            {},
            //Top
            {}
         ];

         tilesetContainer.addEventListener("mousedown", (event) => {
            selection = getCoords(event);
            tilesetSelection.style.left = selection[0] * 32 + "px";
            tilesetSelection.style.top = selection[1] * 32 + "px";
         });

         function addTile(mouseEvent) {
            var clicked = getCoords(mouseEvent);
            var key = clicked[0] + "-" + clicked[1];
         
            if (mouseEvent.shiftKey) {
               delete layers[currentLayer][key];
            } else {
               layers[currentLayer][key] = [selection[0], selection[1]];
            }
            draw();
         }

         canvas.addEventListener("mousedown", () => {
            isMouseDown = true;
         });
         canvas.addEventListener("mouseup", () => {
            isMouseDown = false;
         });
         canvas.addEventListener("mouseleave", () => {
            isMouseDown = false;
         });
         canvas.addEventListener("mousedown", addTile);
         canvas.addEventListener("mousemove", (event) => {
            if (isMouseDown) {
               addTile(event);
            }
         });

        function getCoords(e) {
            const { x, y } = e.target.getBoundingClientRect();
            const mouseX = e.clientX - x;
            const mouseY = e.clientY - y;
            return [Math.floor(mouseX / 32), Math.floor(mouseY / 32)];
         }

        function draw() {
            console.log(canvas);
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
         
            var size_of_crop = 32;
            
            layers.forEach((layer) => {
               Object.keys(layer).forEach((key) => {
                  //Determine x/y position of this placement from key ("3-4" -> x=3, y=4)
                  var positionX = Number(key.split("-")[0]);
                  var positionY = Number(key.split("-")[1]);
                  var [tilesheetX, tilesheetY] = layer[key];
         
                  ctx.drawImage(
                     tilesetImage,
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

        function setLayer(newLayer) {
            //Update the layer
            currentLayer = newLayer;
         
            //Update the UI to show updated layer
            var oldActiveLayer = document.querySelector(".layer.active");
            if (oldActiveLayer) {
               oldActiveLayer.classList.remove("active");
            }
            document.querySelector(`[tile-layer="${currentLayer}"]`).classList.add("active");
         }

        tilesetImage.onload = function() {
        // layers = defaultState;
            draw();
            // setLayer(0);
        }

        tilesetImage.src = "https://assets.codepen.io/21542/TileEditorSpritesheet.2x_2.png"
    }

    // tilesetImage.onload = function() {
    //     // layers = defaultState;
    //     draw();
    //     // setLayer(0);
    // }

    // let mapPage = 
    //     <div className='full-screen'>
    //         <Typography style={{color: 'black', fontSize: 20, fontStyle: 'italic', fontWeight: "bold"}}>
    //             401: Unauthorized Access
    //         </Typography>
    //     </div>

    // if(auth.loggedIn){
    const  mapPage = 
        <div className='full-screen'>
            <NavigationBar/>
            <div className='right-screen'>
                <div className="map">
                    <div className="mapbanner">
                        <Button>New</Button>
                        <Button>Save</Button>
                        <Button>Import</Button>
                        <Button>Export</Button>
                        <Button>Publish</Button>
                        <Button>Share</Button>
                    </div>
                    <div className="card">
                        <div className="card_center-column">
                            <canvas style={styles} width="800%" height="640%">
                            </canvas>
                        </div>
                        <div className="card_body">
                            <div className="card_body_2">
                                <label style={{color: "black"}}>Layer: </label>
                                <div className="layers">
                                    <li><button class="layer" onclick={setLayer(0)} tile-layer="2">Layer 1</button></li>
                                    <li><button class="layer" onclick={setLayer(1)} tile-layer="1">Layer 2</button></li>
                                    <li><button class="layer" onclick={setLayer(2)} tile-layer="0">Layer 3</button></li>
                                </div>
                                <button>+</button>
                                <button><DeleteIcon sx={{ fontSize: 10 }}></DeleteIcon></button>
                                <button><ArrowDownwardIcon sx={{ fontSize: 10 }}></ArrowDownwardIcon></button>
                                <button><ArrowUpwardIcon sx={{ fontSize: 10 }}></ArrowUpwardIcon></button>
                                <aside>
                                    <label style={{color: "black"}}>Tileset: </label>
                                    <div className="tileset-container">
                                        <img id="tileset-source"/>
                                        <div class="tileset-container_selection"></div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    // tilesetImage.onload = function() {
    //     // layers = defaultState;
    //     draw();
    //     // setLayer(0);
    // }
    // }
    // if(!auth.loggedIn){
    //     // mapPage = 
    //     // <div className='full-screen'>
    //     //     <Typography style={{color: 'black', fontSize: 20, fontStyle: 'italic', fontWeight: "bold"}}>
    //     //         401: Unauthorized Access
    //     //     </Typography>
    //     // </div>
    // }

    return (
        <div className='outer-screen'>
            {mapPage}
        </div>
        // <div className='full-screen'>
        //     <NavigationBar/>
        //     <div className='right-screen'>
        //         <div className="map">
        //             <div className="mapbanner">
        //                 <Button>New</Button>
        //                 <Button>Save</Button>
        //                 <Button>Import</Button>
        //                 <Button>Export</Button>
        //                 <Button>Publish</Button>
        //                 <Button>Share</Button>
        //             </div>
        //             <div className="card">
        //                 <div className="card_center-column">
        //                     <canvas style={styles} width="800%" height="500%">
        //                     </canvas>
        //                 </div>
        //                 <div className="card_body">
        //                     <div className="card_body_2">
        //                         <label style={{color: "black"}}>Layer: </label>
        //                         <div className="layers">
        //                             <li><button tile-layer="2">Layer 1</button></li>
        //                             <li><button tile-layer="1">Layer 2</button></li>
        //                             <li><button tile-layer="0">Layer 3</button></li>
        //                         </div>
        //                         <button>+</button>
        //                         <button><DeleteIcon sx={{ fontSize: 10 }}></DeleteIcon></button>
        //                         <button><ArrowDownwardIcon sx={{ fontSize: 10 }}></ArrowDownwardIcon></button>
        //                         <button><ArrowUpwardIcon sx={{ fontSize: 10 }}></ArrowUpwardIcon></button>
        //                         <aside>
        //                             <label style={{color: "black"}}>Tileset: </label>
        //                             <div className="tileset-container">
        //                                 <img height="400" src="https://assets.codepen.io/21542/TileEditorSpritesheet.2x_2.png" />
        //                             </div>
        //                         </aside>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}