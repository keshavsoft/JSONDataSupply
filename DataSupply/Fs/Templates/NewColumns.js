const fs = require('fs');
let CommonAbsolutePath = require("../DataPath");
let path = require("path");

let FoldersAsObject = ({ inUserPK }) => {
    let LocalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp();
    const LocalTemplatesPath = `${LocalDataPath}/${inUserPK}/Templates`;
    let LocalFolderPath;
    let LocalFolderFiles;

    let LocalReturnObject = {};
    const readDirMain = fs.readdirSync(LocalTemplatesPath);

    readDirMain.forEach((dirNext) => {
        if (fs.lstatSync(`${LocalTemplatesPath}/${dirNext}`).isDirectory()) {
            LocalFolderPath = `${LocalTemplatesPath}/${dirNext}/Config/Display/NewColumns`;

            LocalReturnObject[dirNext] = {};

            if (fs.existsSync(LocalFolderPath)) {
                LocalFolderFiles = fs.readdirSync(LocalFolderPath);

                LocalFolderFiles.forEach((LoopFile) => {
                    LocalReturnObject[dirNext][path.parse(LoopFile).name] = JSON.parse(fs.readFileSync(`${LocalFolderPath}/${LoopFile}`));
                });
            };
        };
    });

    return LocalReturnObject;
};

module.exports = { FoldersAsObject };

//console.log("LocalTemplatesPath : ", FoldersAsObject({ inUserPK: 1007 }));