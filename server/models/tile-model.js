const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const TileSchema = new Schema(
    {
        X:              {type: Number, required: true},
        Y:              {type: Number, required: true},
        Type:           {type: String, required: true},
        CurrentUser:    {type: String, required: true},
        Width:          {type: Number, required: true},
        Height:         {type: Number, required: true},
        Pixels:         {type: [String], required: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Tile", TileSchema);