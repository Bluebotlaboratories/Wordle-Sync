// Licensed CC BY-NC-SA 4.0 by Bluebotlaboratories

function loadData(data) {
    keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++) {
        window.localStorage.setItem(keys[i], data[keys[i]])
    }
}

// Enable dark mode if data is set:
const darkMode = window.localStorage.getItem("darkTheme");
const nytDarkMode = window.localStorage.getItem("nyt-wordle-darkmode");
if (darkMode == true || nytDarkMode == "true") {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("nightMode");
}

function setStatus(status, colour = "green") {
    document.getElementById("notification").innerText = status;
    document.getElementById("notification").style = "border-color: " + colour;
}

function toggleHelp() {
    document.getElementById("help").hidden = !document.getElementById("help").hidden;

    if (document.getElementById("help").hidden) {
        setStatus("Ready.", "green");

        var buttons = document.getElementsByClassName("button");

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
        }
    } else {
        setStatus("Help Open", "orange");
        var buttons = document.getElementsByClassName("button");

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }
}

function save() {
    document.getElementById("saveData").value = JSON.stringify(window.localStorage);
    setStatus("Data Saved!");
    setTimeout(() => {setStatus("Ready.", "green")}, 750);
}

function wordleToNYT() {
    document.getElementById("saveData").value = document.getElementById("saveData").value.replace("gameState", "nyt-wordle-state");
    document.getElementById("saveData").value = document.getElementById("saveData").value.replace("darkTheme", "nyt-wordle-darkmode");
    document.getElementById("saveData").value = document.getElementById("saveData").value.replace("statistics", "nyt-wordle-statistics");
}

function NYTToWordle() {
    document.getElementById("saveData").value = document.getElementById("saveData").value.replace("nyt-wordle-state", "gameState");
    document.getElementById("saveData").value = document.getElementById("saveData").value.replace("nyt-wordle-darkmode", "darkTheme");
    document.getElementById("saveData").value = document.getElementById("saveData").value.replace("nyt-wordle-statistics", "statistics");
}

function load() {
    try {
        var dataJSON = JSON.parse(document.getElementById("saveData").value);
        loadData(dataJSON);
        setStatus("Data Loaded!");
        setTimeout(() => {setStatus("Ready.", "green")}, 750);
    } catch {
        setStatus("Invalid Data! Make Sure To Get Data Before Modifying/Loading It", "red");
        setTimeout(() => {setStatus("Ready.", "green")}, 750);
    }
}

function clipboardRead() {
    navigator.clipboard.readText().then(
        function (clipText) {
            document.getElementById("saveData").value = clipText;

            setStatus("Clipboard Pasted!");
            setTimeout(() => {setStatus("Ready.", "green")}, 750);
        },
        function () {
            setStatus("Clipboard Paste Error", "red");
            setTimeout(() => {setStatus("Ready.", "green")}, 750);
        }
    );
}

function clipboardCopy() {
    navigator.clipboard.writeText(document.getElementById("saveData").value).then(
        function () {
            setStatus("Clipboard Copied!");
            setTimeout(() => {setStatus("Ready.", "green")}, 750);
        },
        function () {
            setStatus("Clipboard Copy Error!", "red");
            setTimeout(() => {setStatus("Ready.", "green")}, 750);
        }
    );
}
