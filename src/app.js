require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.MAIN_SEVER_PORT || 3000;
const db = require('./app/config/db');
const routes = require('./routes/');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static public file

app.use(express.static(path.join(__dirname, 'public')));

// Connect DB
db.connect();
// Router
routes(app);
// Start sever

app.listen(port, () => console.log(`Listening at port ${port}`));
