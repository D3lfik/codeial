const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const db = require('./config/mongoose');


//make static file
app.use(express.static('./assets'));
//use express router 

app.use(expressEjsLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
//use express router
app.use('/', require('./routes'));

//set up the view engine 
app.set('view engine', 'ejs');
app.set('views','./views');

app.listen(port, function(err){
    if (err){
        // console.log("Error:" ,err);
        console.log(`Error in running the server : ${err}`);

    }
    console.log(`Server is running on port : ${port}`);
    
});