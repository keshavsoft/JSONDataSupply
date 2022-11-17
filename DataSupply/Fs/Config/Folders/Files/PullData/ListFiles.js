const path = require('path');

const fs = require("fs");
let CommonCheck = require("../../Check/InDataFolder/Check");
let CommonAbsolutePath = require("../../../../DataPath");

let StartFunc = ({ inDataPk, inFolderName }) => {
    //let DataPath = require("../../../../../Kprivate/DataPath.json");
   // let GlobalDataPath = `../../../../../../${DataPath.Path}`;

    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
   // let LocalFolderPath = `${GlobalDataPath}/${inUserPK}`

    let fileList = [];
    let LocalPath = path.resolve(__dirname, `${GlobalDataPath}/${inDataPk}/Data/${inFolderName}`);
    let LocalFromCheck = CommonCheck.ForExistence({ inFolderName, inDataPk });
    
    if (LocalFromCheck.KTF) {
        fs.readdirSync(LocalFromCheck.DirPath).forEach((file) => {
            const fullPath = path.join(LocalPath, file);
            // use lstat so this does not follow dir symlinks
            // (otherwise this will include files from other dirs, which I don't want)
            if (fs.lstatSync(fullPath).isDirectory() === false) {
                if (path.extname(fullPath) === ".json") {
                    fileList.push(path.basename(fullPath));
                };
            };
        });
    };

    return fileList;
};

let ReturnAsArrayOfFileNameOnly = ({ inDataPk, inFolderName }) => {
    let DataPath = require("../../../../../Kprivate/DataPath.json");
    //let GlobalDataPath = `../../../../../../${DataPath.Path}`;
    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});

    let fileList = [];
    let LocalPath = path.resolve(__dirname, `${GlobalDataPath}/${inDataPk}/Data/${inFolderName}`);
    let LocalFromCheck = CommonCheck.ForExistence({ inFolderName, inDataPk });
    console.log("LocalFromCheck ; ", LocalFromCheck);
    if (LocalFromCheck.KTF) {
        fs.readdirSync(LocalFromCheck.DirPath).forEach((file) => {
            const fullPath = path.join(LocalPath, file);
            // use lstat so this does not follow dir symlinks
            // (otherwise this will include files from other dirs, which I don't want)
            if (fs.lstatSync(fullPath).isDirectory() === false) {
                if (path.extname(fullPath) === ".json") {
                    fileList.push(path.parse(fullPath).name);
                };
            };
        });
    };

    return fileList;
};

module.exports = {
    StartFunc,
    ReturnAsArrayOfFileNameOnly
};
