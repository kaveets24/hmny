const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');
require('./models/Track');
require('./models/Playlist');

require('./services/passport');
const spotifyAuth = require('./routes/spotifyAuthRoutes');
const spotifyWrapper = require('./routes/spotifyWrapperRoutes');
const googleAuth = require('./routes/googleAuthRoutes');
const playlists = require('./routes/playlists');

const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', googleAuth);
app.use('/', spotifyAuth); // correct way using express Router;
app.use('/', spotifyWrapper); // correct way using express Router;
app.use('/playlists', playlists);

if (process.env.NODE_ENV === 'production') {

  app.use(express.static('client/build'));

  const path = require('path');
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    console.log(__dirname);
  })
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);