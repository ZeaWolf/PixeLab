const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

// const CommentSchema = new Schema(
//     {
//         userName:       {type: String, required: true},
//         comment:        {type: String, required: true},
//         Date:           {type: Date, required: true}
//     },
//     {timestamps: true}
// );

const ResourceSchema = new Schema(
    {
        Type:           {type: String, required: true},
        TypeId:         {type: ObjectId, required: true},
        MapTilesetName: {type: String, required: true},
        Author:         {type: String, required: true},
        Image:          {type: String, required: true},
        Like:           {type: Number, required: true},
        Comments:       {type: [[String]], required: true},
        PublishTime:    {type: Date, required: true, default: Date.now()},
        Description:    {type: String, required: true}
    },
    {timestamps: true}
);


module.exports = mongoose.model("Resource", ResourceSchema);
// module.exports = mongoose.model("Comment", CommentSchema);