const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

function isLoggedIn(req, res, next){
    let token = '';
    if(req.headers['authorization']){
        token = req.headers['authorization'];
    }
    if(req.headers['x-access-token']){
        token = req.headers['x-access-token'];
    }
    if(req.params.token){
        token = req.params.token;
    }


    console.log("Token: ", token);


    if(token === ''){
        res.json({
            data: null,
            status: false,
            msg: "Token not found"
        })
        //next("Token not provided");
    }

    let splitData = token.split(" ");
    token = splitData[splitData.length-1];
    const data = jwt.verify(token, 'sandesh');
    //
    const user_id = data.id;
    User.findById(user_id)
        .then((user) => {
            if(user){
                data.name = user.name;
                data.email = user.email;
                data.role = user.role
                data.user_id = user_id
                req.user = data;

                // new token generate 
                next();
            } else {
                next("User already deleted.");
            }
        })

}
module.exports = isLoggedIn;