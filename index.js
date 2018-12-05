const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const spotifyAuth = require('./routes/spotifyAuthRoutes');
const googleAuth = require('./routes/googleAuthRoutes');
require('./models/User');
require('./services/passport');

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
app.use('/', googleAuth)
app.use('/', spotifyAuth); // correct way using express Router;
// require('./routes/authRoutes')(app); // returns function defined in authRoutes and calls with the app object.
// require('./routes/spotifyAuthRoutes')(app);


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