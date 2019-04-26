const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  const pathnames = [
    "/auth/google",
    "/api/*",
    "/auth/*",
    "/callback",
    "/refresh_token",
    "/playlists/*",
    "/tracks/*"
  ];

  for (path of pathnames) {
    app.use(proxy(path, { target: "http://localhost:8000" }));
  }
};
