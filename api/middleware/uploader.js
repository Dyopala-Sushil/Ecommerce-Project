const multer = require("multer");

function imageFilter(req, file, cb){
  
  const type = file.mimetype.split('/')[0];
  if(type !== 'image'){
    // not image
    cb(null, false);
  } else {
    // image
    cb(null, true);
  }
}

const mystorage = multer.diskStorage({
    filename: function(req, file, cb){
        const file_name = Date.now()+file.originalname;
        cb(null, file_name);
    },
    destination: function(req, file, cb){
      cb(null, process.cwd()+"/uploads");
    }
});

const upload = multer({
  storage: mystorage,
  fileFilter: imageFilter
})


module.exports = upload;