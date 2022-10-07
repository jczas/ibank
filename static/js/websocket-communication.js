var messageDiv;

function fillLeafs(event) {
    for (let i = 0; i < event.length; i++) {
        const cardBodyDiv = getCardBodyById(i);
        cardBodyDiv.hidden = false;
        cardBodyDiv.innerHTML = "<div class=\"text\">\n".concat(
            event[i][4], "\n",
            "                        </div>\n",
            "                        <div class=\"badge-with-icon\">\n",
            "                            <span class=\"badge\">", event[i][5], "</span>\n",
            "                            <img src=\"../static/svg/kier.svg\">\n",
            "                        </div>"
        );
    }
}

function initWebSocket() {
    var socket = io();
    initializeIdeas();

    messageDiv = document.getElementById("message");

    socket.on("all ideas", (event) => {

        // messageDiv.innerHTML += "<p>reply:" + JSON.stringify(event) + "</p>";

        console.log(JSON.stringify(event));
    });

    socket.on("update_ideas", (event) => {
        for(let j=0; j<10;j++){
            const cardBodyDiv = getCardBodyById(j);
            cardBodyDiv.hidden = true;
        }
        fillLeafs(event);
    });
}

function initializeIdeas() {
    for(let j=0; j<10;j++){
        const cardBodyDiv = getCardBodyById(j);
        cardBodyDiv.hidden = true;
    }
    fetchIdeas().then((response) => {
        fillLeafs(response)
        console.log(response);
    })
}