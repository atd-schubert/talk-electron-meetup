## Use IPC Channels

**Idea**: A file browser for images


### Initialize Project

Initialize the project according the previous styled-app


### Directory information service

Promised based module to get a summary for a directory

**TL;DR**

`electron/directory-info.js`


### Directory information service

Interface of `electron/directory-info.js` response

```typescript
interface IDirectoryInfo {
    root: string;
    dir: string;
    base: string;
    ext: string;
    name: string;
    type: "file" | "image" | "directory";
}
```


### Directory information service

Example respone of `electron/directory-info.js`

```json
[{
    "root": "/",
    "dir": "/path/to/dir",
    "base": "package.json",
    "ext": ".json",
    "name": "package",
    "type": "file"
}]
```


### Implement IPC on main thread

Add ipc-listner

`electron/index.js`
```js
const ipcMain = require("electron").ipcMain;
const directoryInfo = require("./directory-info").directoryInfo;

ipcMain.on("list-directory", (context, { path }) => {
    path = path || process.cwd();
    directoryInfo(path).then((entries) => {
        context.sender.send("list-directory-response", { path, entries });
    }).catch((err) => {
        context.sender.send("list-directory-error", err);
    });
});
```


### Enhance HTML

Restructure body of HTML

`www/index.html`
```html
<nav aria-label="breadcrumb">
    <ol class="breadcrumb" id="breadcrumb"></ol>
</nav>
<div class="container">
    <h3>Sub folders</h3>
    <ul class="list-group" id="subfolders"></ul>
    <h3>Images</h3>
    <ul class="list-group" id="images"></ul>
</div>
```


### Create a simple templating engine for the renderer

Breadcrumb menu

`www/templates.js`
```js
function breadCrumb(path) {
    return path.split("/").map((dirname, index, arr) => {
        if (index === 0) {
            dirname = "/";
        }
        return `<li class="breadcrumb-item"><a href="#" data-path="${ arr.slice(0, index + 1).join("/") || "/" }">${ dirname }</a></li>`;
    });
}
```


### Create a simple templating engine for the renderer

Generic list

`www/templates.js`
```js
function list(entries, type) {
    if (type) {
        entires = entries.filter((entry) => { return type === entry.type; });
    }
    return entires.map((fileEntry) => {
        return `<li class="list-group-item"><a href="#" data-path="${ fileEntry.dir }/${ fileEntry.base }">${ fileEntry.name }</a></li>`;
    });
}
```


### Write IPC listeners on renderer

Load dependencies

`www/ipc-listner.js`
```js
const ipcRenderer = require("electron").ipcRenderer;
const breadCrumbTemplate = require("./templates").breadCrumb;
const listTemplate = require("./templates").list;
```


### Write IPC listeners on renderer

Register listeners and send initial request

`www/ipc-listner.js`
```js
ipcRenderer.on("list-directory-response", (context, response) => {
    document.getElementById("breadcrumb")
        .innerHTML = breadCrumbTemplate(response.path).join("");
    document.getElementById("subfolders")
        .innerHTML = listTemplate(response.entries, "directory").join("") || "<p>None</p>";
    document.getElementById("images")
        .innerHTML = listTemplate(response.entries, "image").join("") || "<p>None</p>";
});

ipcRenderer.send("list-directory", {});
```


### Write DOM listeners on renderer

Register listeners and send initial request

`www/event-listner.js`
```js
const $ = require("jquery-slim");
const ipcRenderer = require("electron").ipcRenderer;

$(document).on("click", "#breadcrumb a, #subfolders a", (event) => {
    ipcRenderer.send("list-directory", { path: event.target.getAttribute("data-path") });
});

$(document).on("click", "#images a", (event) => {
    ipcRenderer.send("show-file", { path: event.target.getAttribute("data-path") });
});
```


### Create JavaScript index for renderer

Load additional dependencies

`www/index.js`
```js
require("./ipc-listener");
require("./event-listener");
```


### Enhance HTML index

Load renderer application

`www/index.html`
```html
<head>
    <!-- ... -->
    <script src="index.js"></script>
</head>
```


### Add an image preview

Open another window from main thread

`electron/index.js`
```js
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
```


### Add an image preview

Register on IPC channel

`electron/index.js`
```js
ipcMain.on("show-file", (context, { path }) => {
    createFilePreviewWindow(path);
});
```


### Start the app

```bash
npm start
```

