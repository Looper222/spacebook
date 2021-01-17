const express = require('express');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(express.json());

// database connection
//const dbURI = 'mongodb+srv://<spb-db-mod>:<auRBDGmo1FKBSilh>@nodetuts.je9tx.mongodb.net/<spacebook>?retryWrites=true&w=majority';
const dbURI = 'mongodb+srv://netusertut:bl4bl4c4r@nodetuts.je9tx.mongodb.net/node-auth?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));