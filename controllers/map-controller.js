const Map = require('../models/map-model');
const Layer = require('../models/layer-model');
const User = require('../models/user-model');

// create a new map in the server
createMap = async(req, res) => {
    try{
        const body = req.body;
        if(!body){
            return res.status(400).json({
                success: false,
                error: 'You must provide correct format for map.',
            });
        }

        // create a Map based on the request's body
        const map = new Map(body);
        
        // if creation of the Map not success
        if(!map){
            return res.status(400).json({success: false, error: err});
        }

        // if success
        map
        .save()
        .then(() =>{
            return res.status(201).json({
                success: true,
                map: map,
                message: 'Map success created.'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Map is not created.'
            })
        })
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

// update the editing change in the map editor
updateMap = async(req, res) => {
    try{
        const body = req.body;
        
        if(!body){
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to update.'
            })
        }

        Map.findOne({ _id: req.params.id}, (err, map) => {
            // console.log("map found: " + JSON.stringify(map));
            if(err){
                return res.status(404).json({
                    err,
                    message: 'Map not found!'
                })
            }
            if(!map){
                return res.status(404).json({
                    err,
                    message: 'Map not found!'
                })
            }
            
            for (let i = 0; i < body.SharedList; i++) {
                User.findOne({OwnerEmail: body.SharedList[i]}, (err, sharedUser) => {
                    if(err){
                        return res.status(400).json({ success: false, error: err})
                    }
                    if(!sharedUser){
                        return res
                            .status(404)
                            .json({success: false, error: 'Shared User not found'})
                    }
                }).catch(err => console.log(err))
            }

//////////////////////////////////////////////
            map.OwnerEmail = body.OwnerEmail;
            map.Name =  body.Name;
            map.SharedList =  body.SharedList;
            map.IsEditing =  body.IsEditing;
            map.Previewed = body.Previewed;

            // new
            map.compressionlevel =  body.compressionlevel;
            map.height =  body.height;
            map.infinite =  body.infinite;
            map.layers =  body.layers;
            map.nextlayerid =  body.nextlayerid;
            map.nextobjectid =  body.nextobjectid;
            map.orientation =  body.orientation;
            map.renderorder =  body.renderorder;
            map.tiledversion =  body.tiledversion;
            map.tileheight =  body.tileheight;
            map.tileset =  body.tileset;
            map.tilewidth =  body.tilewidth;
            map.type =  body.type;
            map.version =  body.version;
            map.width =  body.width;

///////////////////////////////////////
            // map.OwnerEmail = body.OwnerEmail;
            // map.Name = body.Name;
            // map.Type = body.Type;
            // map.SharedList = body.SharedList;
            // map.Source = body.Source;
            // map.Height = body.Height;
            // map.Width = body.Width;
            // map.Layers = body.Layers;
            // map.Tileset = body.Tileset;
            // map.IsEditing = body.IsEditing;

//////////////////////////////////////////////////
            // map.markModified('layers');
            // map.markModified('tileset');
            // console.log(map);

            console.log(map._id);
            map
                .save()
                .then(() => {
                    console.log("SUCESS!!!");
                    return res.status(200).json({
                        success: true,
                        id: map._id,
                        message: 'Map updated!',
                    })
                })
                .catch(error => {
                    console.log("FAILURE: " + JSON.stringify(error));
                    return res.status(400).json({
                        error,
                        message: "Map not updated"
                    })
                })
        })
    }catch(err){
        console.log("what is up: " + err);
        console.error(err);
        res.status(500).send();
    }
}

// delete the map by ID
deleteMap = async (req, res) => {
    try{
        Map.findById({ _id: req.params.id }, (err, map) => {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'Map not found!',
                })
            }
            if(!map){
                return res.status(404).json({
                    err,
                    message: 'Map not found!'
                })
            }
            Map.findOneAndDelete({ _id: req.params.id }, () => {
                return res.status(200).json({ success: true, data: map })
            }).catch(err => console.log(err))
        })
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

// get map by ID
getMapById = async (req, res) => {
    try{
        await Map.findById({_id: req.params.id}, (err, mapByID) => {
            if(err){
                return res.status(400).json({success: false, error: err})
            }
            if(!mapByID){
                return res.status(404).json({
                    err,
                    message: 'Map not found!'
                })
            }
            return res.status(200).json({success: true, map: mapByID})
        }).catch(err => console.log(err))
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

// get MapLists
getMapLists = async (req, res) => {
    try{
        const loggedInUser = await User.findOne({ _id: req.userId });
        await Map.find({$or: [
            {OwnerEmail: loggedInUser.email},
            {SharedList: { $elemMatch: { $eq: loggedInUser.email}}} ]
        }, (err, map) => {
            if(err){
                return res.status(400).json({ success: false, error: err})
            }
            if(!map){
                console.log("no map");
                return res
                    .status(404)
                    .json({success: false, error: 'Map not found'})
            }
            else{
                let pairs = [];
                for(let key in map){
                    let list = map[key];
                    let pair = {
/////////////////////////////////////////////////
                        _id: list._id,
                        OwnerEmail: list.OwnerEmail,
                        Name: list.Name,
                        SharedList:  list.SharedList,
                        IsEditing:  list.IsEditing,
                        Previewed: list.Previewed,

                        // new
                        compressionlevel:  list.compressionlevel,
                        height:  list.height,
                        infinite:  list.infinite,
                        layers:  list.layers,
                        nextlayerid:  list.nextlayerid,
                        nextobjectid:  list.nextobjectid,
                        orientation:  list.orientation,
                        renderorder:  list.renderorder,
                        tiledversion:  list.tiledversion,
                        tileheight:  list.tileheight,
                        tileset:  list.tileset,
                        tilewidth:  list.tilewidth,
                        type:  list.type,
                        version:  list.version,
                        width:  list.width,
/////////////////////////////////////////////////////////
                    };
                    pairs.push(pair);
                }
                return res.status(200).json({success: true, data: map})
            }
        }).catch(err => console.log(err))
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}




//////////////////////////////////////////////////////////////////////////////////////////////////
// create a new layer in the server
createLayer = (req, res) => {
    try{
        const body = req.body;
        if(!body){
            return res.status(400).json({
                success: false,
                error: 'You must provide correct format for layer',
            });
        }

        // create a Map based on the request's body
        const layer = new Layer(body);
        console.log("creating layer: " + JSON.stringify(layer));
        
        // if creation of the Map not success
        if(!layer){
            return res.status(400).json({success: false, error: err});
        }

        // if success
        layer
        .save()
        .then(() =>{
            return res.status(201).json({
                success: true,
                layer: layer,
                message: 'layer success created'
            })

        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'layer is not created'
            })
        })
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

// update the editing change in the map editor
updateLayer = async(req, res) => {
    try{
        const body = req.body;
        console.log("updateLayer: " + JSON.stringify(body));
        if(!body){
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to update'
            })
        }
        // find the map based on _id
        Layer.findOne({ _id: req.params.id}, (err, layer) => {
            console.log("layer found: " + JSON.stringify(layer));
            if(err){
                return res.status(404).json({
                    err,
                    message: 'Layer not found!'
                })
            }
            if(!layer){
                return res.status(404).json({
                    err,
                    message: 'Layer not found!'
                })
            }
            
            layer.Name = body.Name;
            layer.Type = body.Type;
            layer.Height = body.Height;
            layer.Width = body.Width;
            layer.Content = body.Content;
            layer.Locked = body.Locked;
            layer.Opacity = body.Opacity;
            layer.Visible = body.Visible;
            layer.X = body.X;
            layer.Y = body.Y;

            layer
            .save()
            .then(() => {
                console.log("SUCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: layer._id,
                    message: 'Layer updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: "Layer not updated"
                })
            })
        })
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

// delete the map by ID
deleteLayer = async (req, res) => {
    try{
        Layer.findById({ _id: req.params.id }, (err, layer) => {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'layer not found!',
                })
            }
            if(!layer){
                return res.status(404).json({
                    err,
                    message: 'Layer not found!'
                })
            }
            Layer.findOneAndDelete({ _id: req.params.id }, () => {
                return res.status(200).json({ success: true, data: layer })
            }).catch(err => console.log(err))
        })
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

// get map by ID
getLayerById = async (req, res) => {
    try{
        await Layer.findById({_id: req.params.id}, (err, layerByID) => {
            if(err){
                return res.status(400).json({success: false, error: err})
            }
            if(!layerByID){
                return res.status(404).json({
                    err,
                    message: 'Layer not found!'
                })
            }
            return res.status(200).json({success: true, layer: layerByID})
        }).catch(err => console.log(err))
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

// get MapLists
getLayerLists = async (req, res) => {
    try{
        await Layer.find({}, (err, layer) => {
            if(err){
                return res.status(400).json({ success: false, error: err})
            }
            if(!layer){
                console.log("no layer");
                return res
                    .status(404)
                    .json({success: false, error: 'Layers not found'})
            }
            else{
                let pairs = [];
                for(let key in layer){
                    let list = layer[key];
                    let pair = {

                        _id: list._id,
                        Name: list.Name,
                        Type: list.Type,
                        Height: list.Height,
                        Width: list.Width,
                        Content: list.Content,
                        Locked: list.Locked,
                        Opacity: list.Opacity,
                        Visible: list.Visible,
                        X: list.X,
                        Y: list.Y

                    };
                    pairs.push(pair);
                }
                return res.status(200).json({success: true, data: pairs})
            }
        }).catch(err => console.log(err))
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {

    createMap,
    updateMap,
    deleteMap,
    getMapById,
    getMapLists,
    createLayer,
    updateLayer,
    deleteLayer,
    getLayerById,
    getLayerLists
}