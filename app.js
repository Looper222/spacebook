require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const { checkUser } = require('./middleware/authMiddleware');
const socket = require('socket.io');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { idFromCookie } = require('./middleware/componentsMiddleware');
const Cookie = require('cookie');
const chatController = require('./controllers/chatController');


const app = express();

// middleware
app.use(cors());
app.use(cookieParser());
// app.use(methodOverride('_method'));
app.use(express.static('public'));

// data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = app.listen(8080, () => {
    console.log("Server started");
});

let databaseConnection = false;

// database connection
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nodetuts.je9tx.mongodb.net/spacebook?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => {
        console.log("Database connected");
        databaseConnection = true;
    })
    .catch((err) => console.log(err));


const io = socket(server);
io.on("connection", (socket) => {
    console.log('Connection has started');

    socket.emit('start');

    socket.on('hi', (data) => {
        console.log(data.message);
        // socket.emit('ddx', data.message);
    });

    //może zrobić to try catchem czy promisem czy cos
    const cookies = Cookie.parse(socket.request.headers.cookie || "");

    const decodedCookie = jwt.decode(cookies.authenticatedUser);
    // console.log(decodedCookie.id);

    let onlineStatus;

    if (decodedCookie) {
        onlineStatus = true;
        socket.broadcast.emit('status', {
            userID: decodedCookie.id,
            onlineStatus: onlineStatus
        });

        if (databaseConnection) {
            chatController.change_status(decodedCookie.id, onlineStatus);
        } else {
            console.log('Database is so slow');
        }
    }

    chatController.get_lastContacts(decodedCookie.id);

    // zapisac w notatkach, aby przyjrzec się problemowi co jesli użytwonik się
    // nie wylogował
    // dodatkowo dodać cos co bedzie sledzic czy użytkownik ma przegladarke
    // w tle czy faktycznie jest aktywny

    socket.on('disconnect', () => {
        console.log('User has been disconnected');
        onlineStatus = false;
        socket.broadcast.emit('status', {
            userID: decodedCookie.id,
            onlineStatus: onlineStatus
        });
        chatController.change_status(decodedCookie.id, onlineStatus);
        console.log('broadcast disconnection')
    });
});

// @routes
// app.get('*', checkUser);
app.post('/cookieTest', (req, res) => {
    const cookie = req.cookies['authenticatedUser'];

    if (cookie) {
        const decodedCookie = jwt.decode(cookie);
        console.log('Cookie istnieje', cookie);
        console.log(decodedCookie)
        res.status(200).json({
            cookie: cookie,
            decodedCookie: decodedCookie.id
        });
    } else {
        console.log('Cookie nie istnieje');
    }
});
app.use(routes);