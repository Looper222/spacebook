const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const { checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.json());

// database connection
const dbURI = 'mongodb+srv://spb-db-mod:auRBDGmo1FKBSilh@nodetuts.je9tx.mongodb.net/spacebook?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(8080))
    .catch((err) => console.log(err));


// routes
app.get('*', checkUser);
app.use(authRoutes);