// THESE ARE NODE APIs WE WISH TO USE
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const path = require('path')

// CREATE OUR SERVER
dotenv.config()
const PORT = process.env.PORT || 4000;
const app = express()

// SETUP THE MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000", "https://pixelab-sbu.herokuapp.com"],
    credentials: true
}))
// From stackover flow, what is does is to exceed the payload size limit
app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({limit: '200mb', extended: true, parameterLimit:5000000}));

app.use(cookieParser())


// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const pixelabRouter = require('./routes/pixelab-router')
app.use('/api', pixelabRouter)

// INITIALIZE OUR DATABASE OBJECT
const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// PUT THE SERVER IN LISTENING MODE
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


// app.use(express.static("public"));
// app.get('*', function (req, res){
//     res.sendFile(path.join(__dirname + '/', 'public', 'index.html'));
// });

app.use(express.static("client/build"));
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname + '/client/build/index.html'));
});