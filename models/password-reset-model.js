const mongoose = require("mongoose")
//const bcrypt = require("bcryptjs")
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


const PasswordResetSchema = new Schema(
    {
        userId:     {type: ObjectId, required: true},
        resetToken: {type: String, required: true},
        createAt:   {type: Date, expires: 3600, default: Date.now()}
    },
    {timestamps: true}
);

// PasswordResetSchema.pre("save", async function(next){
//     if(this.isModified("token")){
//         const saltRounds = 10;
//         const salt = await bcrypt.genSalt(saltRounds);
//         const hash = await bcrypt.hash(this.resetToken, salt);
//         this.resetToken = hash;
//     }
// });

// PasswordResetSchema.methods.compareToken = async function (token) {
//     const result = await bcrypt.compareSync(token, this.resetToken);
//     return result;
// };

module.exports = mongoose.model("PasswordReset", PasswordResetSchema);
