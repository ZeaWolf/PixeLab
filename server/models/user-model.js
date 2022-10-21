const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

constUserSchema = new Schema(
    {
        userName:       {type: String, required: true},
        email:          {type: String, required: true},
        passwordHash:   {type: String, required: true},
        collectionList: {type: [ObjectId], required: false},
        likeList:       {type: [ObjectId], required: false},
        mapList:        {type: [ObjectId], required: false},
        tilesetList:    {type: [ObjectId], required: false},
    },
    {timestamps: true}
);

const PasswordResetSchema = new Schema(
    {
        userId:     {type: ObjectId, required: ture},
        resetToken: {type: String, required: true},
        createAt:   {type: Date, expires: 3600, default: Date.now()}
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);
module.exports = mongoose.model("PasswordRest", PasswordResetSchema)
