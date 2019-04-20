const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = Schema({
    username: { type: String, required: [true, 'username is required!'] }, 
    shortId :{ type: String, required: [true, 'shortId is required!'] }, 
})

const User = mongoose.model('User', UserSchema);
module.exports = User;