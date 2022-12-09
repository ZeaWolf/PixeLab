const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const Layer = require('./layer-model').schema;

const MapSchema = new Schema(
    {
        OwnerEmail:         {type: String, required: true},
        Name:               {type: String, required: true},    
        SharedList:         {type: [String], required: true},
        IsEditing:          {type: String, required: true},


        // new
        compressionlevel:   {type: Number, required: true}, // -1
        height:             {type: Number, required: true}, // number of tiles
        infinte:            {type: Boolean, required: true}, // false
        layers:             {type: [{
                                data:   {type: [Number]},
                                height: {type: Number},    // number of tiles, same as map height
                                id:     {type: Number},    // layer id
                                name:   {type: String},    // layer name
                                opacity:{type: Number},    // 0 to 1
                                type:   {type: String},    // "tilelayer"
                                visible:{type: Boolean},   // true for shown, false for hidden
                                width:  {type: Number},    // number of tiles, same as map width
                                x:      {type: Number},  // 0
                                y:      {type: Number},  // 0
                            }], required: true},
        nextlayerid:        {type: Number, required: true}, // 1 then increament
        nextobjectid:       {type: Number, required: true}, // 1 
        orientation:        {type: String, required: true}, // "orthogonal"
        renderorder:        {type: String, required: true}, // "right-down"
        tiledversion:       {type: String, required: true}, // "1.0.0"
        tileheight:         {type: Number, required: true}, // 32
        tileset:            {type: [{
                                columns:    {type: Number}, // num of col in tileset
                                firstgid:   {type: Number}, // ID corresponding to the first tile in the set
                                image:      {type: String}, // image name.png
                                imageheight:{type: Number}, // height of source image in pixels
                                imagewidth: {type: Number}, // width of source image in pixels
                                margin:     {type: Number}, // 0
                                name:       {type: String}, // name of tileset
                                spacing:    {type: Number}, // 0
                                tilecount:  {type: Number}, // number of tiles in the tileset
                                tileheight: {type: Number}, // 32
                                tilewidth:  {type: Number}, // 32
                                source:     {type: String}, // image src
                            }], required: true}, //
        tilewidth:          {type: Number, required: true}, // 32
        type:               {type: String, required: true}, // "map"
        version:            {type: String, required: true}, // "1.0"
        width:              {type: Number, required: true}, // number of tiles


        // Name:           {type: String, required: true},
        // Type:           {type: String, required: true},
        // SharedList:     {type: [String], required: true},
        // Source:         {type: String, required: false},    // used for download/export
        // Height:         {type: Number, required: true},
        // Width:          {type: Number, required: true},
        // old layers
        // Layers:         {type: [{type: Map, of: String}], required: true},
        // new layers
        // Layers:         {type: [ {Name: {type: String}, Opacity: {type: Number}, Layer: {type: Map, of: String} } ], required: true},
        // Tileset:        {type: String, required: false},
        // IsEditing:      {type: String, required: true},
    },
    {timestamps: true}
);

module.exports = mongoose.model("Map", MapSchema);