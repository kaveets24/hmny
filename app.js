const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');
require('./models/Track');
require('./models/Playlist');

require('./services/passport');
const spotifyAuth = require('./routes/spotifyAuthRoutes');
const searchAndPlayer = require('./routes/searchAndPlayerRoutes');
const googleAuth = require('./routes/googleAuthRoutes');
const playlists = require('./routes/playlistRoutes');

// Middleware
const requireHTTPS = require("./middleware/requireHTTPS");

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

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Routes
app.use('/', googleAuth);
app.use('/', spotifyAuth);
app.use('/', searchAndPlayer); 
app.use('/', playlists);

if (process.env.NODE_ENV === 'production') {
  app.use(requireHTTPS); // redirect http requests to https.
  app.use(express.static('client/build'));

  const path = require('path');
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);