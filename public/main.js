const socket = io();

const test = document.getElementById('test');
const dest = document.getElementById('dest');
const status = document.getElementById('status');

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
});