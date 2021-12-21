require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.MAIN_SEVER_PORT || 3000;
const cookieParser = require('cookie-parser');

// Import external file
const routes = require('./routes/');
const db = require('./app/config/db');

// Connect DB
db.connect();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static file
app.use(express.static(path.join(__dirname, 'public')));

// Router
routes(app);

// Start sever
app.listen(port, () => console.log(`Listening at port ${port}`));
