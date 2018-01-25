const $ = require("jquery-slim");
const ipcRenderer = require("electron").ipcRenderer;

$(document).on("click", "#breadcrumb a, #subfolders a", (event) => {
    ipcRenderer.send("list-directory", {path: event.target.getAttribute("data-path")});
});

$(document).on("click", "#images a", (event) => {
    ipcRenderer.send("show-file", { path: event.target.getAttribute("data-path") });
});
