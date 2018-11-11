// prod.js - contains production keys for emaily.

module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY
}

// 'mongodb://kaveets24-prod:Tennischamp24!@ds131973.mlab.com:31973/kaveets24-emaily-prod'