const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Tile = require('./tile-model').schema

const TilesetSchema = new Schema(
    {
        OwnerEmail:     {type: String, required: true},
        Name:           {type: String, required: true},
        Type:           {type: String, required: true},
        SharedList:     {type: [String], required: true},
        Columns:        {type: Number, required: true},
        Rows:           {type: Number, required: true},
        Spacing:        {type: Number, required: true},
        Tiles:          {type: [Tile], required: true},
        Source:         {type: String, required: false},     // used for download/export
        IsEditing:      {type: Boolean, required: true}
    },
    {timestamps: true},
);


module.exports = mongoose.model("Tileset", TilesetSchema);