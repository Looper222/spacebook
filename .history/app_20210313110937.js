const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const { checkUser } = require('./middleware/authMiddleware');
require('dotenv').config();
const methodOverride = require('method-override');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');
// const { resolve } = require('path');
// const { rejects } = require('assert');
// const { pathToFileURL } = require('url');


const app = express();

// middleware
app.use(cors());
app.use(methodOverride('_method'));

// data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// database connection
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nodetuts.je9tx.mongodb.net/spacebook?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(8080))
    .catch((err) => console.log(err));

// routes
// app.get('*', checkUser);
app.use(routes);