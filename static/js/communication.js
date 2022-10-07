var socket = io();
socket.on('connect', function () {
    const engine = socket.io.engine;
    console.log(engine.transport.name);
    console.log(`socket ${socket.id} connected`);

    socket.emit('my event', {data: 'I\'m connected!', id: socket.id});

    socket.on("disconnect", (reason) => {
        console.log(`socket ${socket.id} disconnected due to ${reason}`);
    });

    socket.on("my event", (event) => {
        messageDiv = document.getElementById("message");

        messageDiv.innerHTML += "<p>reply:" + event.reply + "</p>";

        console.log(event.reply);
    });

});
