const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const { checkUser } = require('./middleware/authMiddleware');
require('dotenv').config();
const socket = require('socket.io');

const app = express();

// middleware
app.use(cors());
// app.use(methodOverride('_method'));
app.use(express.static('public'));

// data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let server;

// database connection
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nodetuts.je9tx.mongodb.net/spacebook?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => server = app.listen(8080))
    .catch((err) => console.log(err));


const io = socket(server);
io.on("connection", (socket) => {
    console.log('It finally works and connection is going through');
});

// @routes
// app.get('*', checkUser);
app.use(routes);