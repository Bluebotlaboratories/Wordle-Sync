# Wordle-Sync
Allows you to transfer your Wordle save data accross different devices


## How to install/open
### Mobile:
Android devices are not currently supported unfortunately, sorry about that.

For iOS devices, download the shortcut available [here](https://www.icloud.com/shortcuts/dbddf1a6916646cfae953e48efc3c672)
You may need to enable running shortcut scripts, see [this article](https://support.apple.com/en-gb/guide/shortcuts/apdfeb05586f/5.0/ios/15.0#:~:text=Allow%20scripts%20to%20run%20from%20a%20shortcut)

Once you have installed the shortcut, open wordle **in Safari** and open the `sharesheet` (the thing you use for sending websites to people) and scroll down until you see the `Wordle-Sync` shortcut you installed earlier, run it and allow any required permissions.

Once it is done, you may close the `sharesheet` and you will have access to the Wordle-Sync interface


### PC (Vanilla):
Coming Soon


### PC (Userscript/Tampermonkey):
1. Copy contents of the `main.js` file in this repository and go to Wordle
2. Open the developer tools Console on the Wordle page (`Shift + Ctrl + J` or `Shift + ⌘ + J` on most browsers)
3. Once you press enter, the Wordle page should change into the Wordle-Sync app, at this point you can close the developer tools Console


## How to use after installing/opening:
You may obtain save data by clicking the button and then copying the data in the save-data box
To load data, you may paste the data into the save-data box and then clicking the coresponding button

If you need any help, just press the `help` button


You need to refresh the page for changes to apply after loading.

# TODO
- [x] Add iOS Shortcut (preliminary)
- [x] Add main interface
- [ ] Add cloud saves if there is enough demand for it
- [ ] Create a tampermonkey userscript?
