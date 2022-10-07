function init() {
    var socket = io();

    var messageDiv;

    socket.on('connect', function () {
        const engine = socket.io.engine;
        console.log(engine.transport.name);
        console.log(`socket ${socket.id} connected`);

        socket.emit('all ideas', {data: 'I\'m connected!', id: socket.id});

        socket.on("disconnect", (reason) => {
            console.log(`socket ${socket.id} disconnected due to ${reason}`);
        });

        socket.on("all ideas", (event) => {
            messageDiv = document.getElementById("message");

            messageDiv.innerHTML += "<p>reply:" + JSON.stringify(event) + "</p>";

            console.log(JSON.stringify(event));
        });

    });

}

