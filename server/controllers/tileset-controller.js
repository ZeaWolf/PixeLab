const Tileset = require('../models/tileset-model');

// create a new tileset in the server
createTileset = async(req, res) => {
    const body = req.body;
    if(!body){
        return res.status(400).json({
            success: false,
            error: 'You must provide correct format for tileset',
        });
    }

    // create a tileset based on the request's body
    const tileset = new Tileset(body);
    console.log("creating tileset: " + JSON.stringify(tileset));
    
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
}

// update the editing change in the tileset editor
updateTileset = async(req, res) => {
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
        
        tileset.OwnerEmail = body.OwnerEmail;
        tileset.Name = body.Name;
        tileset.Type = body.Type;
        tileset.SharedList = body.SharedList;
        tileset.IsPublished = body.IsPublished;
        tileset.BackgroundColor = body.BackgroundColor;
        tileset.Columns = body.Columns;
        tileset.Rows = body.Rows;
        tileset.Spacing = body.Spacing;
        tileset.TileHeight = body.TileHeight;
        tileset.TileWidth = body.TileWidth;
        tileset.Tiles = body.Tiles;
        tileset.source = body.source;

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
}

// delete the tileset by ID
deleteTileset = async (req, res) => {
    Tileset.findById({ _id: req.params.id }, (err, tileset) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'tileset not found!',
            })
        }
        Tileset.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: tileset })
        }).catch(err => console.log(err))
    })
}

// get tileset by ID
getTilesetById = async (req, res) => {
    await Tileset.findById({_id: req.params.id}, (err, tilesetByID) => {
        if(err){
            return res.status(400).json({success: false, error: err})
        }
        return res.status(200).json({success: true, tileset: tilesetByID})
    }).catch(err => console.log(err))
}

// get TilesetLists
getTilesetLists = async (req, res) => {
    await Tileset.find({}, (err, tileset) => {
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
                    IsPublished: list.IsPublished,
                    BackgroundColor: list.BackgroundColor,
                    Columns: list.Columns,
                    Rows: list.Rows,
                    Spacing: list.Spacing,
                    TileHeight: list.TileHeight,
                    TileWidth: list.TileWidth,
                    Tiles: list.Tiles,
                    source: list.source

                };
                pairs.push(pair);
            }
            return res.status(200).json({success: true, idInfoPairs: pairs})
        }
    }).catch(err => console.log(err))
}

module.exports = {
    createTileset,
    updateTileset,
    deleteTileset,
    getTilesetById,
    getTilesetLists
}