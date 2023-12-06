const express = require("express");
const router= express.Router();
const User = require("../models/User");
const bcrypt = require ("bcrypt");
const {getToken} = require("../utils/helpers");

router.post("/register", async (req, res) =>{
    //code runs when /register api is called as a POST req
    //req.body format: {email, password, firstName, lastName, username}
    const {email, password, firstName, lastName, username} = req.body;

    //Checking for existing user
    const user = await User.findOne({email: email});
    if(user) {
        //Conventionally, status code 200's for 'accepts' , 400s for 'errors'  
        return res.status(403).json({error: "A user with this email already exists"});
    }

    // If user not found, create a new user
    // NEVER STORE PASSWORD IN PLAIN TEXT (MOST BASIC SECURITY MEASURE) textpass => hash
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = {
        email, 
        password: hashedPassword, 
        firstName, 
        lastName, 
        username,
    };
    const newUser = await User.create(newUserData);

    //token creation to return to user
    const token = await getToken(email, newUser);

    const userToReturn = {...newUser.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);

});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email: email});

    if (!user) {
        return res.status(403).json({err: "Invalid credentials"});
    }

    //bcrypt.compare checks plain text password from req.body to the hashed password in db securely
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(403).json({err: "Invalide credentials"});
    }
    const token = await getToken(user.email, user);
    const userToReturn = {...user.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

module.exports = router;    