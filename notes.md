# Node with React: Fullstack Web Development

[Course Resources](https://docs.google.com/document/d/1ZVLphlOH0PEOUCd5v2UJVHiRSKuYjJI-AS4xQWYXmq8/edit)

Diagrams in this course are open source. You are free to edit them as you please. For more info, see lecture #1.


## User Flow and Tech Stack
    1. User signs up via Google OAuth
        a. Express Server
        b. MongoDB
        c. PassportJS

    2. User pays for email credits via Stripe
        a. Stripe
        b. MongoDB

    3. User creates a new campaign
        a. React
        b. Redux

    4. User enters a list of emails to send survey to
        a. React
        b. Redux
        c. Redux Form

    5. App (we) sends email to list of surveyees
        a. Email Provider

    6. Surveyees click on link in email to provide feedback
        a. Email Provider
        b. Express
        c. MongoDB
    7. App (we) tabulate/arrange the feedback
        a. MongoDB?

    8. User can see report of all survey responses
        a. Mongo
        b. React
        c. Redux

## Section 2 - Server Side Architecture

### Heroku Deployment Checklist
    1. Dynamic Port Binding
        const PORT = process.env.PORT || 8000;
    2. Specify Node Environment
        - Add the following to your package.json file:
    
            "engines": {
            "node": "10.11.0",
            "npm": "6.4.1"
            },

    3. Specify Start Script
        - Edit the following in your package.json file:

        "scripts": {
            "start": "node index.js"
        },

    4. Create a .gitignore File
        - Add dependencies to gitignore, because Heroku should download these own its own. 



## Section 4 - Adding MongoDB
    Authentication  Flow

    1. First, the user makes a request to login (vists localhost:8000/auth/google)
    2. Then, we extract the cookie data from the user. 
    3. Send the cookie data to passport.js and pulls out a user_id.
    4. Deserialize the user and turn the user_id back into a user object.
    5. User model instance is added to req object as req.user.
    

### Video 44 - A Deeper Dive

    Middleware -  are small functions which can modify a request, BEFORE they are sent off to route handlers. 


## Section 5 - Dev vs Prod Environments
### Video 45 - Dev vs Prod Keys
    - To eliminate the possibility of losing our DB credentials if anything happens to our local mahine (ie: lost or stolen), we'll add these credentials to our Heroku deployment. 

    - We need to create separate instances of mongoDB, google API account, and cookieKey specifically for the production environment. 
    
    - The following command will connect your existing git repo to your heroku deployment

    $ git remote add heroku https://git.heroku.com/whispering-refuge-83677.git

### Video 47 - Determining Environment
    - Create a new file called "dev.js", which will be responsible for maintaining the production environment variables. 

    - keys.js will be updated to include logic which determines whether we are in development mode, or production. 
### Video 50 - Fixing Heroku Proxy Issues
    - When attempting to authenticate our google user on the Heroku production version of our app, we received a URI error. 

    - The url was changed from HTTPS to HTTP, which caused it to fail.

    - So, we'll pass an additional property to the google strategy located in passport.js, called "proxy"

    - This tells google to trust any incoming proxies to enable the callbackURL to begin with https, instead of http.
``` javascript
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true 
    })
```

## Section 6 - Moving to The Client Side
### Video 51 - React App Generation

    - First, we need to install create-react-app globally via npm.

```
$ npm install -g create-react-app
```
    - After the npm package is installed, we can create a new React app called "client" in our current server/project directory and run the new client server with the following commands:
```
$ npx create-react-app client
$ cd client
$ npm start
```
### Video 53 - Running the Client and Server
    - Since the express server are hosted on different servers, let's download the npm package, "concurrently" in order to run both servers at the same time.

```
$ npm install --save concurrently

```
    - Update the server-side (Express app's) package.json file.
``` javascript
  "scripts": {
    "start": "node index.js",
    "server": "nodemon --inspect index.js",
    "client": "npm run start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }

```
### Video 55 - Routing Stumbling Block

    - In this lesson, we created a sign in button/link to authorize a user's google account. (navigate to /auth/google)

    - The problem, is that we need to put the absolute path to the node server which handles the OAuth flow, and this can get messy when trying to manage the dev and production environments. 

    - So, we'll create a proxy inside of the client's package.json file.
``` javascript
  "proxy": {
    "/auth/google": {
      "target": "http://localhost:8000"
    }

  },
```

    - A proxy allows us to acess the backend server (localhost:8000) directly from the client/react server.

### Video 56 - The Beauty of Create-React-App's Proxy

    - When setting up the proxy to access localhost:8000 in the client's package.json, we don't need to take any additional steps to get this working on our Heroku / production environment.

    - The Create-React-App's "npm run build" command will build our client application and make it available as a bundle of assets inside of the "public" folder for production. From here, we no longer need to run the Create-React-App server in production. 

    - The reason we run the client server in development, is because it offers us things like linting, and server refresh on file change. But, in production these aren't needed.

## Section 7 - Developing the Client Side

### Video 60 - Front End Tech
    - React
    - React Router
    - Redux
### Video 61 - Client React Setup

    index.js - Data layer control (Redux)

    App.js - Rendering layer control (React-Roucter)
### Video 62 - Installing Root Modules
    - Create-React-App contains logic for considering the file in the src directory called "index.js" to contain the root file of your application. 

    - create a folder, "components" and create a file called "App.js" inside

    - any component filename should be capitalized if the file exports a component

    - When importing modules in React, you'll use "import" (ES2015 syntax)

    - When importing modules in Node, you'll use "require()"

### Video 63 - Redux Review & Setup
    Provider - is a component that makes the store available to every component. (comes with react-redux)

    Store - contains the state of our application

    - To determine or to change the state, we can call an action creator, which dispatches an action to all of the reducers in our app.

    - Then, the reducers are combined with the method:
        combineReducers(), and updates the store 
### Video 65 - The Auth reducer

    - The AuthReducer records whether or not the user is logged in.

    - The surveysReducer records a list of all the surveys a user has created. 


### Video 70 - Always Visible Components

     - In react-router-dom, you must set the property "exact" = {true} if you don't want a route to match all components which contain part of the defined route. 

     - Alternatively, include "exact" before the "path prop"
``` javascript
    <Route exact path='/surveys/new' .../>
```

### Video 73 - Webpack with CSS

    - Webpack is a module loader.
    - Take multiple JS or CSS files and turn them into one or fewer files.

    - In our app, we'll need to import the materialize.min.css file inside of index.js

    - The CSS file doesn't add anything to the import variable, so we don't need to include that.

### Video 77 - Basics of Redux Thunk

    -   Redux-Thunk allows us to break the rule that every action creator must return an action.

    - Rather than returning an action and automatically making it available to the reducers, ReduxThunk gives us access to this dispatch function so we can do what we'd like with the actions.

    - So instead of returning the action, we'll return a function() with dispatch as its argument.

### Video 78 - Refactoring the App

    - Refactor the <App /> component to a class-based component

### Video 79 - Testing fetchUser

    - In the client console, you'll see 4 objects, each one is an action that goes into the reducer.

    - The first 3 are startup actions, and we only care about the last one, fetch_user.

### Video 81 - authReducer Return Values 