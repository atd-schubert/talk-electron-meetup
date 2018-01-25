const readdir = require("fs").readdir;
const stat = require("fs").stat;
const joinPaths = require("path").join;
const parsePath = require("path").parse;

function getStat(path) {
    const parsedPath = parsePath(path);
    return new Promise((resolve, reject) => {
        stat(path, (err, stats) => {
            if (err) {
                return reject(err);
            }
            let type;

            if (stats.isDirectory()) {
                type = "directory";
            }
            if (stats.isFile()) {
                type = "file";
                if (/\.(jpe?g|png)/.test(parsedPath.ext)) {
                    type = "image";
                }
            }
            parsedPath.type = type;
            resolve(parsedPath);
        });
    });
}

function directoryInfo(path) {
    return new Promise((resolve, reject) => {
        readdir(path, (err, result) => {
            if (err) {
                return reject(err);
            }
            Promise.all(result.map((entry) => {
                return getStat(joinPaths(path, entry));
            })).then(resolve, reject);
        });
    });
}

exports.directoryInfo = directoryInfo;