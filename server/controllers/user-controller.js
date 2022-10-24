const auth = require("../auth")
const User = require("../models/user-model")
const PasswordReset = require("../models/password-reset-model")
const createRandomToken = require("../utils/helper")
const mailTransport = require("../utils/mail")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")

registerUser = async(req, res) => {
    try {
        const { userName, email, password, passwordVerify } = req.body;
        if (!userName || !email || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter a password of at least 8 characters." });
        }
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter the same password twice." })
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const collectionList = [];
        const likeList = [];
        const mapList = [];
        const tilesetList = [];

        const newUser = new User({userName, email, passwordHash, collectionList, likeList, mapList, tilesetList});
        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                userName: savedUser.userName,
                email: savedUser.email,
                collectionList: savedUser.collectionList,
                likeList: savedUser.likeList,
                mapList: savedUser.mapList,
                tilesetList: savedUser.tilesetList,
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

getLoggedIn = async (req, res) => {
    auth.verify(req, res, async function () {
        try{
            const loggedInUser = await User.findOne({ _id: req.userId });
            return res.status(200).json({
                loggedIn: true,
                user: {
                    userName: savedUser.userName,
                    email: savedUser.email,
                    collectionList: savedUser.collectionList,
                    likeList: savedUser.likeList,
                    mapList: savedUser.mapList,
                    tilesetList: savedUser.tilesetList,
                }
            }).send();
        }catch(err){
            console.error(err);
            res.status(500).send();
        }
    })
}

loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email || !password ) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "Please enter all required fields." 
                });
        }
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "No account with this email address exist."
                })
        }

        console.log(existingUser)
        const isValidPassword = bcrypt.compareSync(password, existingUser.passwordHash);
        if( !isValidPassword ){
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "The password is incorrect."
                })
        }

        console.log(isValidPassword);
        const token = auth.signToken(existingUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            loggedIn: true,
            user: {
                userName: existingUser.userName,
                email: existingUser.email,
                collectionList: existingUser.collectionList,
                likeList: existingUser.likeList,
                mapList: existingUser.mapList,
                tilesetList: existingUser.tilesetList,
            }
        }).send();
    }catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

logoutUser = async (req, res) => {
    try{
        await res.clearCookie('token')
        .status(200).json({
            loggedIn: false,
            user: null
        }).send();
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

forgotPassword = async(req, res) => {
    try{
        const {email} = req.body;
        if(!email){
            return res
                .status(400)
                .json({ errorMessage: "Please provide a vailid email!"});
        }

        const user = await User.findOne({email: email});
        if(!user){
            return res
                .status(400)
                .json({ errorMessage: "Please provide a vailid email!"});
        }

        const token = await PasswordReset.findOne({userId: user._id});
        if(token){
            return res
                .status(400)
                .json({ errorMessage: "Only after one hour you can request for another token!"});
        }

        const randToken = crypto.randomBytes(30).toString("hex");
        if(!randToken){
            return res
                .status(400)
                .json({ errorMessage: "random byte error!"});
        }
        const resetToken = new PasswordReset({userId: user._id, resetToken: randToken})
        if(!randToken){
            return res
                .status(400)
                .json({ errorMessage: "token error!"});
        }
        const savedToken = await resetToken.save();

        
        if(savedToken){
            mailTransport.sendMail({
                from: "sbupixelab@gmail.com",
                to: email,
                subject: "Password Reset Successfully",
                text: `https://sbupixelab.herokuapp.com/reset-password?token=${resetToken}&id=${user._id}`,
            });
            return res.status(200).json({success: true, 
                reset: {
                    userId:     savedToken.userId,
                    resetToken: savedToken.resetToken,
                    createAt:   savedToken.createAt
                }
            }).send();
        }

        return res.status(200).json({success: true, message: "Password reset link is sent!"});
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

resetPassword = async(req, res) => {
    try{
        const {password, passwordVerify} = req.body;

        if (!password || !passwordVerify) return res.status(400).json({ errorMessage: "Please enter all required fields."});

        const user = await User.findById(req.userId);
        if(!user) if(!user) return res.status(400).json({ errorMessage: "User not found!"});

        // Compare old password?

        if (password.length < 8) return res.status(400).json({ errorMessage: "Please enter a password of at least 8 characters." });

        if (password !== passwordVerify) return res.status(400).json({ errorMessage: "Please enter the same password twice." });

        user.password = password;
        const savedUser = await user.save();

        await PasswordReset.findOneAndDelete({userId: user._id});

        return res.status(200).json({success: true, message: "Password Reset Successfully!"});
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
    // mailTransport.sendMail({
    //     from: "sbupixelab@gmail.com"
    //     to: email,
    //     subject: "Password Reset Successfully",
    //     html: passwordResetEmailTemple(`https://sbupixelab.herokuapp.com/
    //     reset-password?token=${resetToken}&id=${user_.id}`),
    // });
}


updateLists = async(req, res) => {
    try{

        const {id, list, itemId} = req.body;
        if(id != req.userId) return res.status(400).json({ errorMessage: "Unauthorized!"});

        const user = await User.findById(req.userId);
        if(!user) return res.status(400).json({ errorMessage: "User not found!"});

        var index;
        switch(list){
            case "collectionList":
                if( (index = user.collectionList.indexOf(itemId)) == -1){
                    user.collectionList.push(itemId);
                }else{
                    user.collectionList.slice(index, 1);
                }
                break;
            case "likeList":
                if( (index = user.likeList.indexOf(itemId)) == -1){
                    user.likeList.push(itemId);
                }else{
                    user.likeList.slice(index, 1);
                }
                break;
            case "mapList":
                if( (index = user.mapList.indexOf(itemId)) == -1){
                    user.mapList.push(itemId);
                }else{
                    user.mapList.slice(index, 1);
                }
                break;
            case "tilesetList":
                if( (index = user.tilesetList.indexOf(itemId)) == -1){
                    user.tilesetList.push(itemId);
                }else{
                    user.tilesetList.slice(index, 1);
                }
                break;
        }

        return res.status(200).json({success: true, message: "Lists Updated Successfully!"});
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    registerUser,
    getLoggedIn,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    updateLists
}
