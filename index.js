const express = require('express');
const cookieParser = require('cookie-parser');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const path = require('path');

//used for session cookie 
const session = require('express-session'); 
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore =require('connect-mongo');
const flash = require('connect-flash');
const   customMware = require('./config/middleware');
const passportGoogle = require('./config/passport-google-oauth2-strategy');


//sass
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:'true',
    outputStyle:'extended',
    prefix:'/css'

}));


app.use(express.urlencoded());

app.use(cookieParser());


//make static file
app.use(express.static('./assets'));
//make the uploads path available to browser 
app.use('/uploads',express.static(__dirname+'/uploads'));
 

app.use(expressEjsLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//set up the view engine 
app.set('view engine', 'ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db

app.use(session({
    name:'codeial',
    //change the secret before deployment before production mode 
    secret:'Blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie: {
        maxAge:(1000 * 60 * 100)
    },
    store : MongoStore.create({
        mongoUrl : "mongodb://127.0.0.1/codeial_development",
        autoRemove : 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    })

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);  

//use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        // console.log("Error:" ,err);
        console.log(`Error in running the server : ${err}`);

    }
    console.log(`Server is running on port : ${port}`);
    
});