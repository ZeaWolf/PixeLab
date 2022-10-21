const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

constResourceSchema = new Schema(
    {
        Id:             {type: Number, required: true},
        Type:           {type: String, required: true},
        TypeId:         {type: Number, required: true},
        MapTilesetName: {type: String, required: true},
        Author:         {type: String, required: true},
        Image:          {type: String, required: true},
        Like:           {type: Number, required: true},
        Comments:       {type: [{String, Date}], required: true},
        PublishTime:    {type: Date, required: true, default: Date.now()},
        Description:    {type: String, required: true}
    },
    {timestamps: true}
);