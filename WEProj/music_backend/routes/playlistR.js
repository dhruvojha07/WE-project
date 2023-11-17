const express = require("express");
const router = express.Router();
const passport = require("passport");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Song = require("../models/Song");

router.post("/create", passport.authenticate("jwt", {session: false}), async (req, res) => {
    const currentUser = req.user;
    const {name, thumbnail, songs} = req.body;
    if (!name || !thumbnail || !songs ){
        return res.status(301).json({err: "Insufficient Data"});
    }
    const playlistData = {
        name, 
        thumbnail,
        songs,
        owner: currentUser._id,
        collaborators: [],
    };

    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);

});
//Get playlist by ID 
// when "/something" checks for exact match 
// when "/:something" this means "something" is now a variable to whuch we can assign any value and API will still be called.
// when calling in format "/playlist/get/thing1" "something" gets assigned value "thing1"
router.get("/get/playlist/:playlistId", passport.authenticate("jwt", {session: false}), async (req, res) => {
    // since this is a GET req, and not a POST there is no req.body, so to send a valid value to API we are using "params" to send the value to the API without the use of req.body
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findOne({_id: playlistId});
    if(!playlist) {
        return res.status(301).json({err: "Invalid ID"});
    }
    return res.status(200).json(playlist);
});

//Get playlists made by an Artist
// we use "/get/abc/:var" instead of "/get:var" so as to avoid having a similar pattern to not confuse the API
router.get("/get/artist/:artistId", passport.authenticate("jwt", {session: false}), async (req, res) => {
    const artistId = req.params.artistId;
    const artist = await User.findOne({_id: artistId});
    if(!artist) {
        return res.status(304).json({err: "Invalid Artist ID"});
    }

    const playlists = await Playlist.find({owner: artistId});
    return res.status(200).json({data: playlists});
});

router.post("/add/song",  passport.authenticate("jwt", {session: false}), async (req, res) =>{
    const currentUser = req.user;
    const {playlistId, songId} = req.body;

    const playlist = await Playlist.findOne({_id: playlistId});
    if(!playlist){
        return res.status(304).json({err:"Playlist does not exist"});
    }
    if(!playlist.owner.equals(currentUser._id) && !playlist.collaborators.includes(currentUser._id)) {
        return res.status(400).json({err: "Not allowed!"});
    }

    const song = await Song.findOne({_id: songId});
    if(!song) {
        return res.status(304).json({err: "Song does not exist."});
    }

    playlist.songs.push(songId);
    await playlist.save();

    return res.status(200).json(playlist);

});

module.exports = router;