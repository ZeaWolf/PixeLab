const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Layer = require('./layer-model').schema;

const MapSchema = new Schema(
    {
        OwnerEmail:     {type: String, required: true},
        Name:           {type: String, required: true},
        Type:           {type: String, required: true},
        SharedList:     {type: [String], required: true},
        Source:         {type: String, required: false},    // used for download/export
        Height:         {type: Number, required: true},
        Width:          {type: Number, required: true},
        // old layers
        // Layers:         {type: [{type: Map, of: String}], required: true},
        // new layers
        Layers:         {type: [ {Name: {type: String}, Opacity: {type: Number}, Layer: {type: Map, of: String} } ], required: true},
        Tileset:        {type: String, required: false},
        IsEditing:      {type: String, required: true},
    },
    {timestamps: true}
);

module.exports = mongoose.model("Map", MapSchema);