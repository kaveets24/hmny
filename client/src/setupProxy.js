const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  const pathnames = [
    "/auth/google",
    "/api/*",
    "/api/playlists/*",
    "/api/tracks/*",
    "/auth/*",
    "/callback",
    "/refresh_token",

  ];

  for (path of pathnames) {
    app.use(proxy(path, { target: "http://localhost:8000" }));
  }
};
