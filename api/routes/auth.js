const router = require('express').Router();
const User = require("../model/user.model");
const passwordHash = require("password-hash");
const generateToken = require('../configs/helpers');

router.post('/login', (req, res, next) => {
    User.findOne({
        email: req.body.email
    })
    .then((user) => {
        
        if(!passwordHash.verify(req.body.password, user.password)){
            res.json({
                data: null,
                msg: "Password does not match",
                status: false
            })
        } else {
            res.json({
                data: {
                    user: user,
                    token: generateToken(user)
                },

                msg: "Success",
                status: true
            })
        }
    })
    .catch((err) => {
        console.log("Error: ", err);
        res.json({
            data: null,
            msg: err,
            status: false
        })
    })
})
module.exports = router;