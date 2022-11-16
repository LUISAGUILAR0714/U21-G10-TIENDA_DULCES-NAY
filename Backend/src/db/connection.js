const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://root:root@cluster0.jckuskz.mongodb.net/mintic?retryWrites=true&w=majority", { }, (err, res) =>{
    if(err){
        console.log(err);
    }else{
        console.log("Connection successful");
    }
});

module.exports = mongoose;