const express = require("express");
const app = express();

const mongoose = require("mongoose");
const User = require("./models/User");

ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const passport = require("passport");

const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/songR");
const playlistRoutes = require("./routes/playlistR");

const cors = require ("cors");

require ("dotenv").config();

const port = 8080;

app.use(cors());
app.use(express.json());
//mongoDB connection
mongoose.connect(
    "mongodb+srv://WEProject1:"
    + process.env.MONGO_PASSWORD +
    "@cluster0.j2maixx.mongodb.net/?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((x) => {
        console.log("Connected to Mongo!");
    })
    .catch((err) => {
        console.log("Error while connecting to Mongo :(");
        console.log(err);
    });



//passport-jwt    
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "bigSecret";
passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.identifier}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));



app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/auth", authRoutes );
app.use("/song", songRoutes );
app.use("/playlist", playlistRoutes );

app.listen(port, () => {
    console.log("App is running on port  " + port);
});