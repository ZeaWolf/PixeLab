const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const TilesetSchema = new Schema(
    {
        OwnerEmail:     {type: String, required: true},
        Name:           {type: Number, required: true},
        Type:           {type: String, required: true},
        SharedList:     {type: [String], required: true},
        IsPublished:    {type: Boolean, required: true},
        BackgroundColor:{type: String, required: true},
        Columns:        {type: Number, required: true},
        Rows:           {type: Number, required: true},
        Spacing:        {type: Number, required: true},
        TileHeight:     {type: Number, required: true},
        TileWidth:      {type: Number, required: true},
        Tiles:          {type: [Number], required: true},
        source:         {type: String, required: true}
    },
    {timestamps: true}
);


module.exports = mongoose.model("Tileset", TilesetSchema);