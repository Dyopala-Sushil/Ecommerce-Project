const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const isLoggedIn = (req, res, next) => {
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


    if(token === ''){
        
        next({
          msg: "Token not provided",
          status: 403
        });
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
                req.user = data;

                // new token generate 
                next();
            } else {
                next("User already deleted.");
            }
        })

}

const isAdmin = (req, res, next) => {
    if(req.user.role == 'admin'){
      next();
    } else {
      next('Unauthorized access.');
    }
  }

const isAdminSeller = (req, res, next) => {
  if(req.user.role == 'admin' || req.user.role =='seller'){
    next();
  } else {
    next('Unauthorized access.');
  }
}

const selfDelete = (req,res,next)=>{
    if(req.user.id == req.params.id){
      next("You are not authorized to delete yourself.")
    } else {
      next()
    }
  }

module.exports= {isAdmin,selfDelete, isLoggedIn, isAdminSeller};