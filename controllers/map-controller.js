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
                error: 'You must provide correct format for map',
            });
        }

        // create a Map based on the request's body
        const map = new Map(body);
        console.log("creating map: " + JSON.stringify(map));
        
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
                message: 'map success created'
            })

        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'map is not created'
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
        console.log("updateMap: " + JSON.stringify(body));
        if(!body){
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to update'
            })
        }
        // find the map based on _id
        Map.findOne({ _id: req.params.id}, (err, map) => {
            console.log("map found: " + JSON.stringify(map));
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
            
            map.OwnerEmail = body.OwnerEmail;
            map.Name = body.Name;
            map.Type = body.Type;
            map.ShareList = body.ShareList;
            map.Source = body.Source;
            map.Height = body.Height;
            map.Width = body.Width;
            map.Layers = body.Layers;
            map.Tileset = body.Tileset;

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
                    return res.status(404).json({
                        error,
                        message: "Map not updated"
                    })
                })
        })
    }catch(err){
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
                    message: 'map not found!',
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
        await Map.find({OwnerEmail: loggedInUser.email}, (err, map) => {
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

                        _id: list._id,
                        OwnerEmail: list.OwnerEmail,
                        Name: list.Name,
                        Type: list.Type,
                        SharedList: list.SharedList,
                        Source: list.Source,
                        Height: list.Height,
                        Width: list.Width,
                        Layers: list.Layers,
                        Tileset: list.Tileset

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