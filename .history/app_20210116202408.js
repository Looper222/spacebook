const express = require('express');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(express.json());

// database connection
const dbURI = 'mongodb+srv://<spb-db-mod>:<jt43IMfhiKilb135>@nodetuts.je9tx.mongodb.net/<spacebook>?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));