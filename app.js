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
    .then(() => {
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

    const getLastContacts = async () => {
        const lastContacts = await chatController.get_lastContacts(decodedCookie.id);
        // console.log(lastContacts);
        const contactsWithStatus = await chatController.status_of_lastContacts(lastContacts);
        console.log(contactsWithStatus);
        return contactsWithStatus;
    };

    const updateLastContacts = async (contactID) => {
        const update = await chatController.update_lastContacts(decodedCookie.id, contactID);
        console.log('update completed');
        getLastContacts();
    };

    const throwLastContacts = async () => {
        const list = await getLastContacts();

        if (list) {
            console.log('jest lista');
            socket.emit('lastContactsStatusUpdate', list);

        } else {
            console.log('lastContacts in line 92 are empty');
        }
    };

    // Elton John's ID
    let eID = '6085a79176f0955784f96170';
    // Phil Collin's ID
    let pID = '6085a79a76f0955784f96171';
    // Bruce Wayne's ID
    let bID = '6085a891f1665f1b94f000de';

    if (decodedCookie) {
        onlineStatus = true;
        socket.broadcast.emit('singleStatus', {
            userID: decodedCookie.id,
            onlineStatus: onlineStatus
        });

        if (databaseConnection) {
            chatController.change_status(decodedCookie.id, onlineStatus);

            // updateLastContacts(pID); //--->>>>> testowe

            // socket.emit('lastContactsStatusUpdate', getLastContacts());

            throwLastContacts();

        } else {
        console.log('Database is so slow');
        }

        socket.on('newUserConnected', async (data) => {
            console.log(data);
            const lastContacts = await chatController.get_lastContacts(decodedCookie.id);

            if (lastContacts.includes(data)) {
                console.log('Someone of lastContacts');
                const contactsWithStatus = await chatController.status_of_lastContacts(lastContacts);
                console.log(contactsWithStatus);
                socket.emit('lastContactsStatusUpdate', contactsWithStatus);
            } else {
                console.log('None of lastContacts');
            }
        });

        socket.on('newLastContact', (data) => {
            //użycie funckji aktualizacji lastContacts
            updateLastContacts(data);
        });
    }

    // zapisac w notatkach, aby przyjrzec się problemowi co jesli użytwonik się
    // nie wylogował
    // dodatkowo dodać cos co bedzie sledzic czy użytkownik ma przegladarke
    // w tle czy faktycznie jest aktywny

    socket.on('disconnect', () => {
        console.log('User has been disconnected');
        onlineStatus = false;
        socket.broadcast.emit('singleStatus', {
            userID: decodedCookie.id,
            onlineStatus: onlineStatus
        });
        chatController.change_status(decodedCookie.id, onlineStatus);
        console.log('broadcast disconnection')
        setTimeout(() => {
            console.log('------------------------------------');
        }, 1000);
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