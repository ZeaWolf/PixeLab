const jwt = require("jsonwebtoken")
const {isValidObjectId} = require("mongoose")
const PasswordRest = require("../models/password-reset-model")
const User = require("../models/user-model")


function authManager(){
    verify = function (req, res, next){
        try{
            const token = req.cookies.token;
            if(!token){
                return res.status(401).json({
                    loggedIn: false,
                    user: null,
                    errorMessage: "Unauthorized"
                })
            }

            const verified = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = verified.userId;

            next();
        }catch(err){
            console.error(err);
            return res.status(401).json({
                errorMessage: "Unauthorized"
            });
        }
    }
    signToken = function(user){
        return jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);
    }

    isResetTokenValid = async(req, res, next) =>{
        try{
            const{token, id} = req.query;
            if(!token || !id) return res.status(400).json({ errorMessage: "Invalid request!"});
            if(!isValidObjectId(id)) return res.status(400).json({ errorMessage: "Invalid request!"});
            const user = await User.findById(id);
            if(!user) return res.status(400).json({ errorMessage: "Invalid request!"});
    
            const reset = await PasswordRest.findOne({userId: user._id});
            if(!reset) return res.status(400).json({ errorMessage: "Invalid request!"});
            
            
            if(!(reset.resetToken === token)) return res.status(400).json({ errorMessage: "Invalid request!"});
    
            req.userId = user._id;
            next();
        }catch(err){
            console.error(err);
            return res.status(401).json({
                errorMessage: "Unauthorized"
            });
        }
    }
    return this;
}


const auth = authManager();
module.exports = auth;