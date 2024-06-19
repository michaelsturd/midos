const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    
});

// create model 
const User = mongoose.model('User', UserSchema)

// export the module 
module.exports = User