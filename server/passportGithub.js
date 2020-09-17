// GITHUB PASSPORT OAUTH2
const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github").Strategy;

const GitInfo = require("./models/GitInfo");

// env vars - might not need to declare explicitly like this
const {
    REACT_APP_CLIENT_ID,
    REACT_APP_CLIENT_SECRET,
    REACT_APP_REDIRECT_URI,
    SECRET
} = process.env;

// setup new GH passport strategy
passport.use(new GitHubStrategy({
    clientID: REACT_APP_CLIENT_ID,
    clientSecret: REACT_APP_CLIENT_SECRET,
    callbackURL: REACT_APP_REDIRECT_URI
},
    (accessToken, refreshToken, profile, done) => {
        GitInfo.findOrCreate({ githubId: profile.id }, (err, user) => {
            return done(err, user);
        });
    }
));

// Express and Passport Session
app.use(session({
    secret: SECRET,
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    // placeholder for custom user serialization
    done(null, user);
});

passport.deserializeUser((user, done) => {
    // User.findById(id, (req, res) => {

    // Get the user from mongo by id?
    GitInfo.findById(id, (req, res) => {
        id: req.body.id
        // idk 
    })
        // idk 2
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));

    done(null, user);
});

// login and logout routing - THESE paths are probably not accurate,
// but can be reset where needed.
app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/profile/:id');
    });

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// middleware for authentication ////////// this is boilerplate copy
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
}

app.get('/protected', ensureAuthenticated, (req, res) => {
    res.send("acess granted");
});
//// end boilerplate

// module.exports passportGithub;