// const mongoose = require('mongoose');
// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const crypto = require('crypto');
// const path = require('path');
// require('dotenv').config();

// const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nodetuts.je9tx.mongodb.net/spacebook?retryWrites=true&w=majority`;

// const conn = mongoose.createConnection(dbURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// });

// // Init gfs
// let gfs;
// let bucket;

// connection.once('open', () => {
//     // Init stream
//     gfs = Grid(conn.db, mongoose.mongo);
//     // gfs.collection('uploads');
    
//     bucket = new mongoose.mongo.GridFSBucket(conn.db, {
//         bucketName: 'ups'
//     });

//     gfs = Grid(connection.db, mongoose.mongo);
//     gfs.collection('ups');
// });

// // conn.once('open', () => {
// //     // Init stream
// //     gfs = Grid(conn.db, mongoose.mongo);
// //     gfs.collection('uploads');
// // });

// // Create storage engine
// const storage = new GridFsStorage({
//     url: dbURI,
//     options: {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     },
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err);
//           }
//           const filename = buf.toString('hex') + path.extname(file.originalname);
//           const fileInfo = {
//             filename: filename,
//             bucketName: 'uploads'
//           };
//           resolve(fileInfo);
//         });
//       });
//     }
// });
// const upload = multer({ storage });

// // @route POST /upload
// // @desc Uploads file to DB

// // const upload_single_file = (req, res) => {
// //     try {
// //         res.json({ fileID: req.file.id, filename: req.file.filename });
// //     } catch (err) {
// //         console.log(err);
// //         res.status(400).json('Attempt failed');
// //     }
// // };

