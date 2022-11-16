const express = require('express');
const router = require('./routers/router');

let app = express();

// Add middleware
app.use( express.json() );
app.use( express.urlencoded( {extended:true}) );

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, XRequested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

// Add routers
app.use ( router );

module.exports = app;