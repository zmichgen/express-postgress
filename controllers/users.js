const users = require("../db/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserDTO = require('../models/userDTO');
const User = require('../models/user');
require("dotenv").config();

// Define a function to create a token

const signToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
};

const signup = async (req, res) => {
    try {
        const {
            email,
            password,
            firstName,
            lastName
        } = req.body;

        if (!(email && password && firstName && lastName)) {
            return res.status(400).send("All Input Is Required");
        }
        const olderUser = await users.findOne({
            email
        });
        if (olderUser) {
            return res.status(409).send("User Exist, Please Login. ");
        }
        const hashpassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            id: null,
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashpassword,
            posts: []
        });
        const user = await users.save(newUser);
        const token = signToken(user.id);
        res.status(200).json({
            status: "success",
            token,
            user: new UserDTO(user)
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const login = async (req, res) => {

    try {
        const {
            email,
            password
        } = req.body

        if (!(email && password)) {
            return res.status(400).json("All input is required ");
        }

        const user = await users.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(400).json("Wrong Details, Try Again");
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return res.status(400).json("Wrong password, Try Again");
        }

        const token = signToken(user._id);

        res.status(200).json({
            user: new UserDTO(user),
            token
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const isAuthenticated = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json("Unauthorized!. Please login");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await users.findById(decodedToken.id);
    if (!user) {
        return res.status(401).json("authorization not found");
    }
    req.user = user;
    next();
};

module.exports = {
    signup,
    login,
    isAuthenticated
};