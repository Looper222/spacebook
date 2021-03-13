const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config();

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nodetuts.je9tx.mongodb.net/spacebook?retryWrites=true&w=majority`;

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

// Creat mongo connection
const conn = mongoose.createConnection(dbURI, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true });

// Init gfs
let gfs;
let gridFSBucket;

conn.once('open', () => {
    // Init stream
    // gfs = Grid(conn.db, mongoose.mongo);
    // gfs.collection('uploads');
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });
});

// Create storage engine
const storage = new GridFsStorage({
    url: dbURI,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
});
const upload = multer({ storage });

// @route POST /upload
// @desc Uploads file to DB

const upload_single_file = (req, res) => {
    res.json({ fileID: req.file.id, filename: req.file.filename });
};

const get_files = (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({
                errorMessage: 'No files found'
            });
        }
        return res.json(files);
    });
};

const get_single_file = (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
            errorMessage: 'No file found'
            });
        }
        return res.json(file);
    });
};

const get_single_image = (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                errorMessage: 'No file found'
            });
        }

        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                errorMessage: 'Not an image'
            });
        }
    });
};

const delete_single_file = (req, res) => {
    gridFSBucket.deleteOne({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        }

        res.status(201).json({
            operationStatus: 'File has been deleted'
        });
    });
};

module.exports = {
    upload,
    upload_single_file,
    get_files,
    get_single_file,
    get_single_image,
    delete_single_file
}