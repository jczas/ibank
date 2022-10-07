

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
           return res.json()
        })
        .then((id) => {
            console.log(id)
        })
}

function addNewIdea(nick, subject, body) {
    const ideaData = {
        nick: nick,
        subject: subject,
        body: body
    };
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
          return res.json()
        })
        .then(id => {
            console.log(id)
        });
}

function submitNewIdea() {
    console.log("Submitting...");
    showInit();
    const form = document.querySelector('form');
    const formData = new FormData(form);
    addNewIdea(formData.get('nick'), formData.get('subject'), formData.get('description'))
}

function preventFormReloading() {
    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })
}

function showInit() {
    document.getElementById('createForm').hidden = true;
    document.getElementById('headerColumn').hidden = false;
    document.getElementById('rowCards').hidden = false;
    document.getElementById('rowCards2').hidden = false;
    document.getElementById('rowCards3').hidden = false;
    document.getElementById('rowCards4').hidden = false;
    document.getElementById('createButton').hidden = false;
}

function showForm() {
    document.getElementById('createForm').hidden = false;
    document.getElementById('headerColumn').hidden = true;
    document.getElementById('rowCards').hidden = true;
    document.getElementById('rowCards2').hidden = true;
    document.getElementById('rowCards3').hidden = true;
    document.getElementById('rowCards4').hidden = true;
    document.getElementById('createButton').hidden = true;
}

preventFormReloading();