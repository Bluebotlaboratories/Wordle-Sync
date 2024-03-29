// Licensed CC BY-NC-SA 4.0 by Bluebotlaboratories

var html = document.getElementsByTagName("html")[0];

html.innerHTML = `
<!-- Licensed CC BY-NC-SA 4.0 by Bluebotlaboratories -->
<head>
    <style>
        body {
            --notificationColor: #c6c9cc;
            --fieldColour: #d7dadc;
            --textColor: #000;
            --invertedNotificationColor: #272729;
            --invertedFieldColour: #3a3a3c;
            --invertedTextColor: #d7dadc;
        }
        * {
            font-family: sans-serif;
        }
        #notification {
            background-color: var(--notificationColor);
            text-align: center;
            border-style: solid;
            border-radius: 5px;
            border-width: 2.5px;
            padding: 20px;
        }
        button {
            background-color: var(--fieldColour);
            box-shadow: none;
            border: none;
            padding: 5px;
            color: var(--textColor);
            font-weight: bold;
            border-radius: 5px;
        }
        .inverted {
            background-color: var(--invertedFieldColour);
            color: var(--invertedTextColor);
        }
        #saveData {
            height: 100px;
            width: 200px;
            background-color: var(--fieldColour);
            color: var(--textColor);
        }
        .nightMode {
            background-color: #121213;
            color: #d7dadc;
            --notificationColor: #272729;
            --fieldColour: #3a3a3c;
            --textColor: #d7dadc;

            --invertedNotificationColor: #c6c9cc;
            --invertedFieldColour: #d7dadc;
            --invertedTextColor: #000;
        }
        #help {
            position: fixed;
            background-color: var(--fieldColour);
            color: var(--textColor);
            margin-top: 5px;
            border-radius: 5px;
            left: 50%;
            margin-left: calc(-25% - 10px);
            width: 50%;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div style="border-color: green;" id="notification">Ready.</div>
    <br >
    <button onclick="toggleHelp();">Instructons & Help</button>

    <div hidden id="help">
        <h1>Wordle Sync</h1>
        <p>This application allows you to save/load Wordle save files</p>
        <p>Click on "Get Save Data" to get your save data from Wordle</p>
        <p>The save data will appear in the save data field and then you can copy it with the copy contents button</p>
        <br />
        <p>If you want to load save data into Wordle, simply paste it into the save data field and click on "Load Save Data", then reload and your save data should be loaded!</p>
        <br />
        <br />
        <p>Additional functions are also available with the buttons below</p>
        <br />
        <br />
        <p>You can click the Instructions & Help button again or the close button to close this popup</p>
        <p>Don't forget to reload the page to return to WORDLE</p>
        <br />
        <button class="inverted" onclick="toggleHelp();">Close Help</button>
    </div>

    <br >
    <br >
    <button class="button" onclick="save();">Get Save Data</button>
    <button class="button" onclick="load();">Load Save Data</button>
    <br >
    <br >
    
    Conversion Tools:
    <button class="button" onclick="wordleToNYT();">Wordle -> NYT</button>
    <button class="button" onclick="NYTToWordle();">NYT -> Wordle</button>
    
    <br >
    <br >
    <br >
    Save Data:
    <br >
    <textarea id="saveData"></textarea>
    <br >
    <br >
    <button class="button" onclick="clipboardCopy();">Copy Contents</button>
    <button class="button" onclick="clipboardRead();">Paste Contents</button>
<body>
`;

var script = document.createElement("script");
var scriptContent = document.createTextNode(`
function loadData(data) {
    keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++) {
        window.localStorage.setItem(keys[i], data[keys[i]])
    }
}

// Enable dark mode if data is set:
var darkMode = window.localStorage.getItem("darkTheme");
var nytDarkMode = JSON.parse(window.localStorage.getItem("nyt-wordle-moogle/ANON")).settings.darkMode;
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
`);

script.appendChild(scriptContent);

var notification = document.getElementById("notification");
document.body.insertBefore(script, notification);
