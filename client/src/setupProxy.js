const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    app.use(proxy('/auth/google', { target: 'http://localhost:8000' }));
    // app.use(proxy('/api/current_user', { target: 'http://localhost:8000' }));

}