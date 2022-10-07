var messageDiv;

function initWebSocket() {
    var socket = io();

    messageDiv = document.getElementById("message");

    socket.on("all ideas", (event) => {

        // messageDiv.innerHTML += "<p>reply:" + JSON.stringify(event) + "</p>";

        console.log(JSON.stringify(event));
    });

    socket.on("update_ideas", (event) => {
        // messageDiv.innerHTML = "<p>reply:" + JSON.stringify(event) + "</p>";
    });
}
