const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Layer = require('./layer-model').schema;
const Tile = require('./tile-model').schema;

const MapSchema = new Schema(
    {
        OwnerEmail:     {type: String, required: true},
        Name:           {type: String, required: true},
        Type:           {type: String, required: true},
        IsPublished:    {type: Boolean, required: true},
        ShareList:      {type: [String], required: true},
        Source:         {type: String, required: true},
        BackgroundColor:{type: String, required: true},
        Height:         {type: Number, required: true},
        Width:          {type: Number, required: true},
        Layers:         {type: [Layer], required: true},
        NextLayerIndex: {type: Number, required: true},
        Xcoordinate:    {type: Number, required: true},
        Ycoordinate:    {type: Number, required: true},
        Tileheight:     {type: Number, required: true},
        Tilewidth:      {type: Number, required: true},
        Tileset:        {type: [Tile], required: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Map", MapSchema);