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

// data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// database connection
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nodetuts.je9tx.mongodb.net/spacebook?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(8080))
    .catch((err) => console.log(err));


//#region StorageFunction

// create storage engine
// const storage = new GridFsStorage({
//     url: dbURI,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 const filename = but.toString('hex') + path.extname(file.originalname);
//                 const fileInfo = {
//                     filename: filename,
//                     bucketName: 'uploads'
//                 };
//                 resolve(fileInfo);
//             });
//         });
//     }
// });

// const upload = multer({ storage });
//#endregion

// routes
app.get('*', checkUser);
app.use(authRoutes);