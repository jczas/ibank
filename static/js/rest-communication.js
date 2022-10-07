

function sendIdeaLike(ideaId) {
    fetch("/idea/like/" + ideaId,
        {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            console.log('Liked idea: ' + res)
        })
}

function addNewIdea(nick, subject, body) {
    const ideaData = {
        nick: nick,
        subject: subject,
        body: body
    }
    fetch("/idea/add",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ideaData)
        })
        .then((res) => {
          console.log('Added idea: ' + res)
        })
}