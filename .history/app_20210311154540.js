const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const { checkUser } = require('./middleware/authMiddleware');
require('dotenv').config();
const methodOverride = require('method-override');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database connection
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nodetuts.je9tx.mongodb.net/spacebook?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(8080))
    .catch((err) => console.log(err));


// routes
app.get('*', checkUser);
app.use(authRoutes);