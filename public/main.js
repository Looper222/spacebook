const socket = io();

const test = document.getElementById('test');
const dest = document.getElementById('dest');
const status = document.getElementById('status');
const info = document.getElementById('info');
const lastContacts = document.getElementById('lastContacts');

socket.on('start', () => {
    const msg = "I'm connected";
    test.innerHTML = msg;
    socket.emit('hi', { message: msg });

});

// socket.on('ddx', (data) => {
//     dest.innerHTML = data;
// });

socket.on('singleStatus', (data) => {
    const text = `Status usera: ${data.userID} to ${data.onlineStatus}`;
    status.innerHTML = text;
    socket.emit('newUserConnected', data.userID);
});

socket.on('lastContactsStatusUpdate', (data) => {
    // const list = data.toString();
    console.log(data);
    info.innerHTML = 'Event się wykonał';
    let list = '';
    for (let i = 0; i < data.length; i++) {
        list += `{ user: ${data[i]._id}, statusOnline: ${data[i].onlineStatus} } `;
        console.log(list);
    }

    lastContacts.innerHTML = list;
});

document.addEventListener('click', (e) => {
    if (e.target.id === "id1" || e.target.id === "id2" || e.target.id === "id3") {
        const contactID = document.getElementById(e.target.id).value;

        document.getElementById('result').innerHTML = `Contact id: ${contactID}`;

        socket.emit('newLastContact', contactID);
    }
});