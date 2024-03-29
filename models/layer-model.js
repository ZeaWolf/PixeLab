const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
//const Layer = require('./layer-model').schema;

const LayerSchema = new Schema(
    {
        // Image:          {type: String, required: true},
        //Layers:         {type: [Layer], required: true},
        // TransparentColor:   {type: String, required: true},   // don't know why use it
        // OffsetX:            {type: Number, required: true},
        // OffsetY:            {type: Number, required: true},
        // Parallaxx:          {type: Number, required: true},
        // Parallaxy:          {type: Number, required: true},



        Name:               {type: String, required: true},
        Type:               {type: String, required: true},
        Height:             {type: Number, required: true},
        Width:              {type: Number, required: true},
        Content:            {type: [[String]], required: true},    // store tile's source
        Locked:             {type: Boolean, required: true},
        Opacity:            {type: Number, required: true},
        Visible:            {type: Boolean, required: true},
        X:                  {type: Number, required: true},
        Y:                  {type: Number, required: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Layer", LayerSchema);