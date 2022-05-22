const dbConfig = require("../configs/dbcofig");
const User = require("../model/user.model");
const passwordHash = require("password-hash");

const fs = require("fs");
class UserController {

    registerUser(req, res, next){  
      // req.body
      

        const user = new User(req.body);  // an object User model
        // user

        // if(req.file){
        //   // image/...
        //   // image/png => split('/'), [0] => image, [1] -> png
        //   const type = req.file.mimetype.split('/')[0];
        //   if(type !== 'image'){
        //     // delete 
        //     fs.unlink(process.cwd()+'/uploads/'+req.file.filename, function(err, success){
        //       // 
        //       console.log("File unlinked.");
        //     });
        //   } else {
        //     user.image = req.file.filename;
        //   }
        // }
        let images = [];
        if(req.files){
          for(let file of req.files){
            images.push(file.filename);
          }
          user.image = images;
        }

        // if(req.file){
        //   user.image = req.file.filename;
        // }

        user.password = passwordHash.generate(req.body.password);

        let temp_add = {
            ward_no: req.body.temp_addr_ward_no,
            name: req.body.temp_addr
        };

        let perm_add = {
          ward_no: req.body.perm_addr_ward_no,
          name: req.body.perm_addr
        }

        user.address["temp"] = temp_add;
        user.address["perm"] = perm_add;

        // console.log("User: ",user);

        user.save()
        .then((success) => {
          res.json({
            result: user,
            status: 200,
            msg: "User registered successfully"
          });
        })
        .catch((err) => {
          res.json({
            result: null,
            status: 400,
            msg: "Sorry! User could not be registered at this moment"
          });
        })
    }
    
    getUser(req, res, next) {
      console.log("Here");  
      User.find()
        .exec((err, users) => {
          if(err){
            res.json({Error: err});
          } else {
            res.json(users);
          }
        })
        // .then((users) => {
        //   res.json(users);
        // }) 
        // .catch((err) => {
        //   res.json({
        //     Error: err
        //   });
        // })
          
    }

    getUserById(req, res, next){
      // get user by id
      User.findById(req.params.id)
      .then((user) => {
        res.json(req.user)
      })
      .catch((err) => {
        res.json({Error: err});
      })
    }

    updateUserById(req, res, next){

      let user = req.body;
      if(req.file){
        user.image = req.file.filename;
      }
        User.updateOne(
          {
            _id: req.params.id
          },
          {
            $set: user
          },{
            upsert: true
          }
        ).then((success) => {
          
          res.json(success);
        }).catch((err) => {
          res.json({Error: err});
        })
    }
    
    deleteUserById(req, res, next){
        User.deleteOne({
          _id: req.params.id 
        })
        .then((success) => {
          res.json(success);
        }) 
        .catch((err) => {
          res.json({Error: err});
        })
    }

}
  module.exports = UserController;