const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/mern-3";
// const atlasUrl = "mongodb+srv://sandeshbhattarai:<password>@cluster0.nss1a.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(dbUrl, function(err, succcess){
    if(err){
        console.log("Error in db Connection...");
    } else {
        console.log("DB connected successfully.");
    }
});