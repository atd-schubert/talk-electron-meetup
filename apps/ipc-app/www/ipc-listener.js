const ipcRenderer = require("electron").ipcRenderer;
const breadCrumbTemplate = require("./templates").breadCrumb;
const listTemplate = require("./templates").list;

ipcRenderer.send("list-directory", {});

ipcRenderer.on("list-directory-response", (context, response) => {
    document.getElementById("breadcrumb").innerHTML = breadCrumbTemplate(response.path).join("");
    document.getElementById("subfolders").innerHTML = listTemplate(response.entries, "directory").join("") || "<p>None</p>";
    document.getElementById("images").innerHTML = listTemplate(response.entries, "image").join("") || "<p>None</p>";
});
