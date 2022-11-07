const Tileset = require('../models/tileset-model');
const Tile = require('../models/tile-model');
const User = require('../models/user-model');

// create a new tileset in the server
createTileset = async(req, res) => {
    try{
        const body = req.body;
        if(!body){
            return res.status(400).json({
                success: false,
                error: 'You must provide correct format for tileset',
            });
        }

        // create a tileset based on the request's body
        const tileset = new Tileset(body);
        // console.log("creating tileset: " + JSON.stringify(tileset));

        // if creation of the tileset not success
        if(!tileset){
            return res.status(400).json({success: false, error: err});
        }

        // if success
        tileset
        .save()
        .then(() =>{
            return res.status(201).json({
                success: true,
                tileset: tileset,
                message: 'tileset success created'
            })

        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'tileset is not created'
            })
        })
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

// update the editing change in the tileset editor
updateTileset = async(req, res) => {
    try{
        const body = req.body;
        console.log("updateTile: " + JSON.stringify(body));
        if(!body){
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to update'
            })
        }
        // find the tileset based on _id
        Tileset.findOne({ _id: req.params.id}, (err, tileset) => {
            console.log("tileset found: " + JSON.stringify(tileset));
            if(err){
                return res.status(404).json({
                    err,
                    message: 'tileset not found!'
                })
            }
            if(!tileset){
                return res.status(404).json({
                    err,
                    message: 'tileset not found!'
                })
            }
            
            tileset.OwnerEmail = body.OwnerEmail;
            tileset.Name = body.Name;
            tileset.Type = body.Type;
            tileset.SharedList = body.SharedList;
            tileset.Columns = body.Columns;
            tileset.Rows = body.Rows;
            tileset.Spacing = body.Spacing;
            tileset.Tiles = body.Tiles;
            tileset.Source = body.Source;

            tileset
                .save()
                .then(() => {
                    console.log("SUCESS!!!");
                    return res.status(200).json({
                        success: true,
                        id: tileset._id,
                        message: 'Tileset updated!',
                    })
                })
                .catch(error => {
                    console.log("FAILURE: " + JSON.stringify(error));
                    return res.status(404).json({
                        error,
                        message: "Tileset not updated"
                    })
                })
        })
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

// delete the tileset by ID
deleteTileset = async (req, res) => {
    try{
        Tileset.findById({ _id: req.params.id }, (err, tileset) => {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'tileset not found!',
                })
            }
            if(!tileset){
                return res.status(404).json({
                    err,
                    message: 'tileset not found!'
                })
            }
            Tileset.findOneAndDelete({ _id: req.params.id }, () => {
                return res.status(200).json({ success: true, data: tileset })
            }).catch(err => console.log(err))
        })
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

// get tileset by ID
getTilesetById = async (req, res) => {
    try{
        await Tileset.findById({_id: req.params.id}, (err, tilesetByID) => {
            if(err){
                return res.status(400).json({success: false, error: err})
            }
            if(!tilesetByID){
                return res.status(404).json({
                    err,
                    message: 'tileset not found!'
                })
            }
            return res.status(200).json({success: true, data: tilesetByID})
        }).catch(err => console.log(err))
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

// get TilesetLists
getTilesetLists = async (req, res) => {
    try{
        const loggedInUser = await User.findOne({ _id: req.userId });
        await Tileset.find({OwnerEmail: loggedInUser.email}, (err, tileset) => {
            if(err){
                return res.status(400).json({ success: false, error: err})
            }
            if(!tileset){
                console.log("no tileset");
                return res
                    .status(404)
                    .json({success: false, error: 'Tileset not found'})
            }
            else{
                let pairs = [];
                for(let key in tileset){
                    let list = tileset[key];
                    let pair = {

                        _id: list._id,
                        OwnerEmail: list.OwnerEmail,
                        Name: list.Name,
                        Type: list.Type,
                        SharedList: list.SharedList,
                        Columns: list.Columns,
                        Rows: list.Rows,
                        Spacing: list.Spacing,
                        Tiles: list.Tiles,
                        source: list.source

                    };
                    pairs.push(pair);
                }
                return res.status(200).json({success: true, data: tileset})
            }
        }).catch(err => console.log(err))
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

createTile = async(req, res) => {
    try{
        const body = req.body;
        if(!body){
            return res.status(400).json({
                success: false,
                error: 'You must provide correct format for tile',
            });
        }

        // create a tile based on the request's body
        const tile = new Tile(body);
        console.log("creating tileset: " + JSON.stringify(tile));
        
        // if creation of the tile not success
        if(!tile){
            return res.status(400).json({success: false, error: err});
        }

        // if success
        tile
        .save()
        .then(() =>{
            return res.status(201).json({
                success: true,
                tile: tile,
                message: 'tile success created'
            })

        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'tileset is not created'
            })
        })
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

// get tile by ID
getTileById = async (req, res) => {
    try{
        await Tile.findById({_id: req.params.id}, (err, tileByID) => {
            if(err){
                return res.status(400).json({success: false, error: err})
            }
            if(!tileByID){
                return res.status(404).json({
                    err,
                    message: 'tile not found!'
                })
            }
            return res.status(200).json({success: true, tile: tileByID})
        }).catch(err => console.log(err))
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

// updating the tile's source
updateTile = async (req, res) => {
    try{
        const body = req.body;
        console.log("updateTile: " + JSON.stringify(body));
        if(!body){
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to update'
            })
        }
        // find the tile based on _id
        Tile.findOne({ _id: req.params.id}, (err, tile) => {
            console.log("Tile found: " + JSON.stringify(tile));
            if(err){
                return res.status(404).json({
                    err,
                    message: 'Tile not found!'
                })
            }
            if(!tile){
                return res.status(404).json({
                    err,
                    message: 'tile not found!'
                })
            }
            
            tile.X = body.X;
            tile.Y = body.Y;
            tile.Type = body.Type;
            tile.Source = body.Source;

            tile
                .save()
                .then(() => {
                    console.log("SUCESS!!!");
                    return res.status(200).json({
                        success: true,
                        id: tile._id,
                        message: 'Tile updated!',
                    })
                })
                .catch(error => {
                    console.log("FAILURE: " + JSON.stringify(error));
                    return res.status(404).json({
                        error,
                        message: "Tile not updated"
                    })
                })
        })
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}


module.exports = {
    createTileset,
    updateTileset,
    deleteTileset,
    getTilesetById,
    getTilesetLists,
    createTile,
    getTileById,
    updateTile
}