const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const UserPost = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    refresh_token:{
        type: String,
        required: false
    }
},{
    timestamps: true
});

module.exports = mongoose.model('User', UserPost);