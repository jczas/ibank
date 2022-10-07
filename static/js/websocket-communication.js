var messageDiv;
var sendIdeaButton;

function init() {
    var socket = io();
    messageDiv = document.getElementById("message");
    sendIdeaButton = document.getElementById('sendIdea');

    socket.on("connect", () => {
        console.log("connect: " + socket.id);
    });

    socket.on("disconnect", () => {
        console.log("disconnect: " + socket.id);
    });

    socket.on("all ideas", (event) => {

        messageDiv.innerHTML += "<p>reply:" + JSON.stringify(event) + "</p>";

        console.log(JSON.stringify(event));
    });

    socket.on("update_ideas", (event) => {
        messageDiv.innerHTML = "<p>reply:" + JSON.stringify(event) + "</p>";
    });
}

function sendIdea() {
    var socket = io();

        socket.emit('all ideas', {idea_id: 'idea id', user_id: socket.id});

}

