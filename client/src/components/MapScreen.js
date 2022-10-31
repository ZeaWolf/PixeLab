
var canvas = document.querySelector("canvas");
var tilesetContainer = document.querySelector(".tileset-container");
var tilesetSelection = document.querySelector(".tileset-container_selection");
var tilesetImage = document.querySelector("#tileset-source");

export default function MapScreen() {
    const styles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgb(235, 225, 225)"
    };
    return (
        <div className="card">
            <div>
                <ul className="layers">
                    <div className="card_left-column">
                        <canvas style={styles} width="100" height="100">
                        </canvas>
                    </div>
                    <div className="layer">
                        <label>Editing Layer:</label>
                        <li><button tile-layer="2">Layer 1</button></li>
                        <li><button tile-layer="1">Layer 2</button></li>
                        <li><button tile-layer="0">Layer 3</button></li>
                    </div>
                </ul>
            </div>
            <div className="card_body">
                <aside>
                    <label>Import Tileset</label>
                    <div className="tileset-container">
                        <img src="https://assets.codepen.io/21542/TileEditorSpritesheet.2x_2.png" />
                    </div>
                </aside>
            </div>
        </div>
    )
}