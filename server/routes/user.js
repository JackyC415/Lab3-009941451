const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const Users = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
    console.log('Registering...');

    //input validation with joi
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(6).max(16).pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
        restaurantname: Joi.string().max(30),
        zipcode: Joi.string().max(5)
    });

    if (!req.session.isLoggedIn) {
        const { error, value } = schema.validate({ name: req.body.name, email: req.body.email, password: req.body.password, restaurantname: req.body.restaurantname, zipcode: req.body.zipcode });
        if (error) {
            throw error;
        } else {
            Users.findOne({ email: req.body.email }).then(user => {
                if (user) {
                    console.log('Email already exists!');
                    res.status(400).json("Email already exists!");
                } else {
                    console.log(req.body);
                    const newUser = new Users({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        restaurantname: req.body.restaurantname,
                        cuisine: req.body.cuisine,
                        zipcode: req.body.zipcode,
                        owner: req.body.owner
                    });

                    bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(() => res.json('Registered!'))
                            .catch(err => res.status(400).json('Error: ' + err))
                    });
                    console.log(newUser);
                }
            });
        }
    } else {
        return res.status(400).json("Please logout first to register!");
    }
};

exports.login = (req, res) => {
    console.log('Login...');

    //validate user inputs w/ Joi
    const schema = Joi.object({
        email: Joi.string().lowercase().trim().email().required(),
        password: Joi.string().min(6).max(16).pattern(/^[a-zA-Z0-9]{3,30}$/).required()
    });

    //once validated, query user credential and validate against hash password w/ bcrypt and jwt
    const { error, value } = schema.validate({ email: req.body.email, password: req.body.password });
    if (error) {
        throw error;
    } else {
        Users.findOne({ email: req.body.email }).then(user => {
            if (!user) return res.status(404).json('Email does not exist!');
            bcrypt.compare(req.body.password, user.password).then(isMatch => {
                if (isMatch) {
                    if (!user.owner) {
                        res.cookie('cookie', "buyer", { maxAge: 900000, httpOnly: false, path: '/' });
                    } else {
                        res.cookie('cookie', "owner", { maxAge: 900000, httpOnly: false, path: '/' });
                    }
                    req.session.ID = user.id;
                    req.session.isLoggedIn = true;
                    res.writeHead(200, { 'Content-Type': 'text/plain' })
                    res.end("Successful Login!");
                } else {
                    return res.status(400).send('Incorrect password!');
                }
            });
        });
    }
};

exports.getProfile = (req, res) => {
    console.log('Retrieving Profile...');
    if (!req.session.isLoggedIn) {
        res.sendStatus(404);
    } else {
        Users.findById({ _id: req.session.ID }, (err, user) => {
            if (err) {
                throw err;
            } else if (user) {
                console.log(user);
                res.status(200).send(user);
            } else {
                return res.status(404).send("Profile does not exist!");
            }
        });
    }
};

exports.updateProfile = (req, res) => {
    console.log('Updating Profile...');
    if (!req.session.isLoggedIn) {
        console.log("Please log in to update profile.");
    } else {
        Users.findByIdAndUpdate(req.session.ID, req.body, (err, user) => {
            if (err) throw err;
            res.status(200).send("Updated profile successfully!");
        });
    }
};

exports.logOut = (req, res) => {
    console.log("Logging out...");
    req.session.isLoggedIn = false;
    req.session.ID = null;
    req.session.itemName = null;
    res.sendStatus(200);
};