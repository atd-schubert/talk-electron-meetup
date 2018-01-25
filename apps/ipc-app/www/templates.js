function breadCrumb(path) {
    return path.split("/").map((dirname, index, arr) => {
        if (index === 0) {
            dirname = "/";
        }
        return `<li class="breadcrumb-item"><a href="#" data-path="${ arr.slice(0, index + 1).join("/") || "/" }">${ dirname }</a></li>`;
    });
}

function list(entries, type) {
    if (type) {
        entires = entries.filter((entry) => { return type === entry.type; });
    }
    return entires.map((fileEntry) => {
        return `<li class="list-group-item"><a href="#" data-path="${ fileEntry.dir }/${ fileEntry.base }">${ fileEntry.name }</a></li>`;
    });
}

module.exports.breadCrumb = breadCrumb;
module.exports.list = list;
