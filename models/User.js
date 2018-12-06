
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  spotifyId: String
});

mongoose.model('users', userSchema);