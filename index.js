const express = require('express');
const cookieParser = require('cookie-parser');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

//used for session cookie 
const session = require('express-session'); 
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore =require('connect-mongo');


app.use(express.urlencoded());

app.use(cookieParser());


//make static file
app.use(express.static('./assets'));
//use express router 

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


//use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        // console.log("Error:" ,err);
        console.log(`Error in running the server : ${err}`);

    }
    console.log(`Server is running on port : ${port}`);
    
});