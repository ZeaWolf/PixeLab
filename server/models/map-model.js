const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Layer = require('./layer-model').schema;

const MapSchema = new Schema(
    {
        OwnerEmail:     {type: String, required: true},
        Name:           {type: String, required: true},
        Type:           {type: String, required: true},
        ShareList:      {type: [String], required: true},
        Source:         {type: String, required: true},    // used for download/export
        Height:         {type: Number, required: true},
        Width:          {type: Number, required: true},
        Layers:         {type: [Layer], required: true},
        Tileset:        {type: String, required: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Map", MapSchema);