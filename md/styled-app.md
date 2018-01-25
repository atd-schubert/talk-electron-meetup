## Let's style the local application

### Initialize Project

Initialize the project according the previous local-app


### Install your Web-UI of choice

Example for bootstrap
```bash
npm install --save bootstrap popper.js jquery-slim
```


### Enhance HTML index

Load additional dependencies

`www/index.html`
```html
<head>
    <!-- ... -->
    <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css">
    <script src="../node_modules/jquery-slim/dist/jquery.slim.js"></script>
    <script src="../node_modules/popper.js/dist/popper.min.js"></script>
    <script src="../node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
</head>
```


### Enhance HTML index

Rewrite the body

`www/index.html`
```html
<body>
<div class="container">
    <h1>Styled example Application</h1>
    <p>You can put every content on this website like you prefer, including scripts, styles and media.</p>
    <div class="alert alert-secondary">
        <p>This app is created with
            <a href="https://github.com/electron/electron/">Electron</a>.
        </p>
    </div>
</div>
</body>
```


### Start the app

```bash
npm start
```

