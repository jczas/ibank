

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

function fetchIdeas() {
    return fetch("/idea/all",
        {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            return res.json()
        })
}

function submitNewIdea() {
    console.log("Submitting...");
    showInit();
    document.getElementById('headerColumn').hidden = false;
    const form = document.querySelector('form');
    const formData = new FormData(form);
    addNewIdea(formData.get('nick'), formData.get('subject'), formData.get('description'))

    setTimeout(() => {
        document.getElementById('headerColumn').hidden = true;
    }, 5000);
}

function preventFormReloading() {
    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })
}

function showInit() {
    document.getElementById('createForm').hidden = true;
    document.getElementById('headerColumn').hidden = true;
    document.getElementById('rowCards').hidden = false;
    document.getElementById('rowCards2').hidden = false;
    document.getElementById('rowCards3').hidden = false;
    document.getElementById('rowCards4').hidden = false;
}

function showForm() {
    document.getElementById('createForm').hidden = false;
    document.getElementById('headerColumn').hidden = true;
    document.getElementById('rowCards').hidden = true;
    document.getElementById('rowCards2').hidden = true;
    document.getElementById('rowCards3').hidden = true;
    document.getElementById('rowCards4').hidden = true;
    document.getElementById('nickInput').value = "";
    document.getElementById('subjectInput').value = "";
    document.getElementById('descriptionInput').value = "";
    document.getElementById('submitButton').disabled = true;
    document.getElementById('submitButton').setAttribute("class", "button-send-invalid");
    document.getElementById('creationDate').innerHTML = getDate(0).bold();
    document.getElementById('disappearanceDate').innerHTML = "In ".bold() + getDisappearanceTime(86400).bold();
}

function getDate(numberOfDays) {
    const today = new Date();
    today.setDate(today.getDate() + numberOfDays);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '.' + mm + '.' + yyyy;
}

function getDisappearanceTime(numberOfSeconds) {
    var sec_num = parseInt(numberOfSeconds, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

function validateInputs() {
    if ((document.getElementById('nickInput').value.length > 0) &&
        (document.getElementById('subjectInput').value.length > 0) &&
        (document.getElementById('descriptionInput').value.length > 0)
    ) {
        document.getElementById('submitButton').disabled = false;
        document.getElementById('submitButton').setAttribute("class", "button-send");
    } else {
        document.getElementById('submitButton').disabled = true;
        document.getElementById('submitButton').setAttribute("class", "button-send-invalid");
    }
}

function getCardBodyById(cardId) {
    return  document.getElementById('cardBody'+cardId)
}

preventFormReloading();
