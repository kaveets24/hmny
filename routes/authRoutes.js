const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout(); // Takes the cookie which contains our user id, and kills the id that's there.
    res.send("<h4>You have successfully logged out!</h4>");
  });

  app.get('/api/current_user', (req, res) => {
     
     res.send(req.user);
  });
};