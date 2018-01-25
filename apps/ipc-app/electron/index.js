const app = require("electron").app;
const BrowserWindow = require("electron").BrowserWindow;
const path = require("path");
const url = require("url");

const ipcMain = require("electron").ipcMain;
const directoryInfo = require("./directory-info").directoryInfo;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 1000, height: 800});

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../www/index.html'),
        protocol: 'file:',
        slashes: true
    }));

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

function createFilePreviewWindow (srcPath) {
    win = new BrowserWindow({width: 400, height: 300});
    win.loadURL(url.format({
        pathname: srcPath,
        protocol: 'file:',
        slashes: true
    }));
    win.setAlwaysOnTop(true, "modal-panel");
    win.on('closed', () => {
        win = null;
    });
}

app.on('certificate-error', (err) => {
    console.log("cert-err", err);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on("list-directory", (context, { path }) => {
    path = path || process.cwd();
    directoryInfo(path).then((entries) => {
        context.sender.send("list-directory-response", { path, entries });
    }).catch((err) => {
        context.sender.send("list-directory-error", err);
    });
});

ipcMain.on("show-file", (context, { path }) => {
    createFilePreviewWindow(path);
});