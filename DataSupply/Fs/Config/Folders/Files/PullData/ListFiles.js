const path = require('path');

const fs = require("fs");
let CommonCheck = require("../../Check/InDataFolder/Check");

let StartFunc = ({ inDataPk, inFolderName }) => {
    let DataPath = require("../../../../../Kprivate/DataPath.json");
    let GlobalDataPath = `../../../../../../${DataPath.Path}`;

    let fileList = [];
    //  console.log("dir : ", dir);
    let LocalPath = path.resolve(__dirname, `${GlobalDataPath}/${inDataPk}/Data/${inFolderName}`);
    let LocalFromCheck = CommonCheck.ForExistence({ inFolderName, inDataPk });

    if (LocalFromCheck.KTF) {
        fs.readdirSync(LocalFromCheck.DirPath).forEach((file) => {
            const fullPath = path.join(LocalPath, file);
            // use lstat so this does not follow dir symlinks
            // (otherwise this will include files from other dirs, which I don't want)
            if (fs.lstatSync(fullPath).isDirectory() === false) {
                if (path.extname(fullPath) === ".json") {
                    //fileList.push(fullPath);
                    fileList.push(path.basename(fullPath));
                };
            };
        });
    };

    return fileList;
};

module.exports = { StartFunc };
