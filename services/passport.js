const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const SpotifyStrategy = require("passport-spotify").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

var SpotifyWebApi = require("spotify-web-api-node");

const ROOT_URL = keys.rootUrl;

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: keys.spotifyClientID,
  clientSecret: keys.spotifyClientSecret,
  redirectUri: new URL("/callback", ROOT_URL).href
});

passport.serializeUser((user, done) => {
  done(null, user);
});

// passport.deserializeUser((id, done) => {
//   User.findById(id).then(user => {
//     done(null, user);
//   });
// });
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true // trust any incoming proxies to enable the callback url to begin with https, instead of http.
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // we already have a record with the given profile ID
        console.log("A google user exists ya dumbo");
        return done(null, existingUser);
      }
      // we don't have a user record with this ID, make a new record!
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
      console.log("A new google user has been added to mongoDB");
    }
  )
);

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.spotifyClientID,
      clientSecret: keys.spotifyClientSecret,
      callbackURL: "/callback",
      proxy: true
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      // console.log("Access Token: ", accessToken);
      spotifyApi.setAccessToken(accessToken);
      //     spotifyApi.getUserPlaylists(profile.id)
      //     .then(function(data) {
      //   // console.log('Retrieved playlists', data.body);
      // },function(err) {
      //   console.log('Something went wrong!', err);
      // });
      const existingUser = await User.findOne({ spotifyId: profile.id });
      if (existingUser) {
        // we already have a record with the given profile ID
        console.log("A spotify user exists ya dumbo");

        await User.findOneAndUpdate(
          { spotifyId: profile.id },
          { $set: { spotifyAccessToken: accessToken } },
          { new: true },
          (err, user) => {
            if (err) return done(null, user);
            return done(null, user);
          }
        );
      } else {
        // we don't have a user record with this ID, make a new record!
        const user = await new User({
          spotifyId: profile.id,
          spotifyAccessToken: accessToken
        }).save();
        done(null, user);
        console.log("A new spotify user has been added to mongoDB");
      }
    }
  )
);
