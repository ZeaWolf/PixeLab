
import { Fab, Typography, Box, Button } from '@mui/material';
import NavigationBar from './NavigationBar'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
var canvas = document.querySelector("canvas");
// var tilesetContainer = document.querySelector(".tileset-container");
// var tilesetSelection = document.querySelector(".tileset-container_selection");
// var tilesetImage = document.querySelector("#tileset-source");


export default function MapScreen() {
    const styles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgb(235, 225, 225)"
    };
    return (
        <div className="map">
            {/* <NavigationBar></NavigationBar> */}
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
                <canvas style={styles} width="800" height="500">
                </canvas>
            </div>
            <div className="card_body">
                <div className="layer">
                    <label>Editing Layer:</label>
                    <li><button tile-layer="2">Layer 1</button></li>
                    <li><button tile-layer="1">Layer 2</button></li>
                    <li><button tile-layer="0">Layer 3</button></li>
                    <button>+</button>
                    <button><DeleteIcon sx={{ fontSize: 10 }}></DeleteIcon></button>
                    <button><ArrowDownwardIcon sx={{ fontSize: 10 }}></ArrowDownwardIcon></button>
                    <button><ArrowUpwardIcon sx={{ fontSize: 10 }}></ArrowUpwardIcon></button>
                    <aside>
                        <label>Import Tileset</label>
                        <div className="tileset-container">
                            <img height="400px" src="https://assets.codepen.io/21542/TileEditorSpritesheet.2x_2.png" />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
        </div>
    )
}