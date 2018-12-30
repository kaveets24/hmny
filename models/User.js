
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  spotifyId: String,
  spotifyAccessToken: String,
  spotifyRefreshToken: String,
});

mongoose.model('users', userSchema);