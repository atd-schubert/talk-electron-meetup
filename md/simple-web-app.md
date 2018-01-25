## First steps - a simple Web-App

### Initialize Project

```bash
mkdir mapbender-desktop
cd mapbender-desktop
npm init # Answer the CLI. Use "electron/index.js" as entry point...

npm install --save-dev electron # add electron also as peer dependency!
```


### Edit package.json
*Just the important lines*

`package.json`
```json
{
  "main": "electron/index.js",
  "scripts": {
    "start": "electron ./"
  },
  "devDependencies": {
    "electron": "^1.7.11"
  },
  "peerDependencies": {
    "electron": "^1.7.11"
  }
}

```


### Write JavaScript file
Import dependencies

`electron/index.js`
```javascript
const app = require("electron").app;
const BrowserWindow = require("electron").BrowserWindow;
```


### Write JavaScript file
Create a reference for your window

`electron/index.js`
```javascript
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
```


### Write JavaScript file
Write `createWindow` function

`electron/index.js`
```javascript
function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 1000, height: 800});

    // and load the index.html of the app.
    win.loadURL("https://demo.mapbender3.org/");

    // Open the DevTools.
    // win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}
```


### Write JavaScript file
Register default `EventListener`s

`electron/index.js`
```javascript
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    app.quit();
});
```


### Write JavaScript file
Enhance `EventListener`s for usage on macs

`electron/index.js`
```javascript
// Quit when all windows are closed.
app.on('window-all-closed', () => { // Notice: Rewrite!!!
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
```


### Start the app

```bash
npm start
```

