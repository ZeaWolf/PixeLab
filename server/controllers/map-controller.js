const Map = require('../models/map-model');

// create a new map in the server
createMap = (req, res) => {
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
}

// update the editing change in the map editor
updateMap = async(req, res) => {
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
        
        map.OwnerEmail = body.OwnerEmail;
        map.Name = body.Name;
        map.Type = body.Type;
        map.IsPublished = body.IsPublished;
        map.ShareList = body.ShareList;
        map.Source = body.Source;
        map.BackgroundColor = body.BackgroundColor;
        map.Height = body.Height;
        map.Width = body.Width;
        map.Layers = body.Layers;
        map.NextLayerIndex = body.NextLayerIndex;
        map.Xcoordinate = body.Xcoordinate;
        map.Ycoordinate = body.Ycoordinate;
        map.Tileheight = body.Tileheight;
        map.Tilewidth = body.Tilewidth;
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
}

// delete the map by ID
deleteMap = async (req, res) => {
    Map.findById({ _id: req.params.id }, (err, map) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'map not found!',
            })
        }
        Map.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: map })
        }).catch(err => console.log(err))
    })
}

// get map by ID
getMapById = async (req, res) => {
    await Map.findById({_id: req.params.id}, (err, mapByID) => {
        if(err){
            return res.status(400).json({success: false, error: err})
        }
        return res.status(200).json({success: true, map: mapByID})
    }).catch(err => console.log(err))
}

// get MapLists
getMapLists = async (req, res) => {
    await Map.find({}, (err, map) => {
        if(err){
            return res.status(400).json({ success: false, error: err})
        }
        if(!map){
            console.log("no map");
            return res
                .status(404)
                .json({success: false, error: 'Maps not found'})
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
                    IsPublished: list.IsPublished,
                    ShareList: list.ShareList,
                    Source: list.Source,
                    BackgroundColor: list.BackgroundColor,
                    Height: list.Height,
                    Width: list.Width,
                    Layers: list.Layers,
                    NextLayerIndex: list.NextLayerIndex,
                    Xcoordinate: list.Xcoordinate,
                    Ycoordinate: list.Ycoordinate,
                    Tileheight: list.Tileheight,
                    Tilewidth: list.Tilewidth,
                    Tileset: list.Tileset

                };
                pairs.push(pair);
            }
            return res.status(200).json({success: true, idInfoPairs: pairs})
        }
    }).catch(err => console.log(err))
}

module.exports = {
    createMap,
    updateMap,
    deleteMap,
    getMapById,
    getMapLists
}