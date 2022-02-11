// Copyright Bluebotlaboratories 2022 under CC BY-SA-NC 4.0

var html = document.getElementsByTagName("html")[0];

html.innerHTML = `
<head>
    <style>
        body {
            --notificationColor: #c6c9cc;
            --fieldColour: #d7dadc;
            --textColor: #000;
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
    <button onclick="toggleHelp();">Help</button>

    <div hidden id="help">
        <h1>Wordle Sync</h1>
        <p>This application allows you to save/load Wordle save files</p>
        <p>Click on "Get Save Data" to get your save data</p>
        <p>The save data will appear in the save data field and then you can copy it with the copy contents button</p>
        <br >
        <p>If you want to load save data, simply paste it into the save data field and click on "Load Save Data", then reload and your data should be loaded!</p>
        <br >
        <br >
        <p>You can click help again to close this</p>
        <p>Don't forget to reload the page to return to WORDLE!</p>
    </div>

    <br >
    <br >
    <button class="button" onclick="save();">Get Save Data</button>
    <button class="button" onclick="load();">Load Save Data</button>
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
// Enable dark mode if data is set:
var darkMode = window.localStorage.getItem("darkTheme");
var nytDarkMode = window.localStorage.getItem("nyt-wordle-darkmode");
if (darkMode == true || darkMode == "true" || nytDarkMode == true || nytDarkMode == "true") {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("nightMode");
}

function loadData(data) {
    keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++) {
        window.localStorage.setItem(keys[i], data[keys[i]])
    }
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

function load() {
    var dataJSON = JSON.parse(document.getElementById("saveData").value);
    loadData(dataJSON);
    setStatus("Data Loaded!");
    setTimeout(() => {setStatus("Ready.", "green")}, 750);
}

function clipboardRead() {
    navigator.clipboard.readText().then(
        function (clipText) {
            document.getElementById("saveData").value = clipText;

            setStatus("Clipboard Pasted!");
            setTimeout(() => {setStatus("Ready.", "green")}, 750);
        },
        function () {
            setStatus("Clipboard Paste Error!", "red");
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
