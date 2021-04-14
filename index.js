require('dotenv').config()
const express = require('express');
const app = express();
const config = require('config')
const PORT = config.get('port');
const connectDB = require('./db');

// SETUP MIDDLEWARES 
const setMiddlewares = require('./middlewares');
setMiddlewares(app);

// USING ROUTES from Routes Directory 
const setRoutes = require('./routes');
setRoutes(app);

connectDB()
    .then(client => {
        console.log(client)
        app.listen(PORT, () => console.log(`http://${config.get('app-url')}:${PORT}`))
    })
    .catch(err => console.log(err.message))
