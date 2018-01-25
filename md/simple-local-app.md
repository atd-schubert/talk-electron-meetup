## A local application

### Initialize Project

Initialize the project according the previous web-app


### Base directory for the renderer

```bash
mkdir www
```


### Write HTML index

`www/index.html`
```html
<html>
<head><title>Local App with Electron</title></head>
<body><p>
  This app is created with
  <a href="https://github.com/electron/electron/">Electron</a>.
</p></body>
</html>
```


### Write JavaScript file
Enhance dependencies

`electron/index.js`
```javascript
const path = require("path");
const url = require("url");
```


### Write JavaScript file
Load created HTML file in WebView

`electron/index.js`
```javascript
function createWindow () {
    // ...
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../www/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    // ...
}
```


### Start the app

```bash
npm start
```

