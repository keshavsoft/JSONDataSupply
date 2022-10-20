const fs = require('fs');
let CommonAbsolutePath = require("../DataPath");
let path = require("path");

let FoldersAsObject = ({ inUserPK }) => {
    let LocalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp();
    const LocalTemplatesPath = `${LocalDataPath}/${inUserPK}/TemplatesCommon`;
    let LocalFolderPath;
    let LocalScreens;
    let LocalScreenValues;
    let LocalReturnObject = {};
    const readDirMain = fs.readdirSync(LocalTemplatesPath);

    readDirMain.forEach((dirNext) => {
        // console.log("dirNext : ", dirNext);
        if (fs.lstatSync(`${LocalTemplatesPath}/${dirNext}`).isDirectory()) {
            LocalFolderPath = `${LocalTemplatesPath}/${dirNext}`;

            //LocalReturnObject[dirNext] = {};

            if (fs.existsSync(LocalFolderPath)) {
                if (fs.lstatSync(LocalFolderPath).isDirectory()) {
                    LocalScreens = fs.readdirSync(LocalFolderPath);

                    LocalScreens.forEach((LoopScreen) => {
                        LocalReturnObject[LoopScreen] = {};

                        LocalScreenValues = fs.readdirSync(`${LocalFolderPath}/${LoopScreen}`);

                        LocalScreenValues.forEach((LoopScreenFiles) => {
                            LocalReturnObject[LoopScreen][path.parse(LoopScreenFiles).name] = JSON.parse(fs.readFileSync(`${LocalFolderPath}/${LoopScreen}/${LoopScreenFiles}`));
                        });
                    });
                };
            };
        };
    });
   // console.log("LocalReturnObject : ", LocalReturnObject);
    return LocalReturnObject;
};

let FoldersAsObject1 = ({ inUserPK }) => {
    let LocalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp();
    const LocalTemplatesPath = `${LocalDataPath}/${inUserPK}/TemplatesCommon`;
    let LocalFolderPath;
    let LocalScreens;
    let LocalScreenValues;
    let LocalReturnObject = {};
    const readDirMain = fs.readdirSync(LocalTemplatesPath);

    readDirMain.forEach((dirNext) => {
        //    console.log("dirNext : ", dirNext);
        if (fs.lstatSync(`${LocalTemplatesPath}/${dirNext}`).isDirectory()) {
            LocalFolderPath = `${LocalTemplatesPath}/${dirNext}`;

            LocalReturnObject[dirNext] = {};

            LocalScreens = fs.readdirSync(LocalFolderPath);

            LocalScreens.forEach((LoopScreen) => {
                LocalReturnObject[dirNext][LoopScreen] = {};

                LocalScreenValues = fs.readdirSync(`${LocalFolderPath}/${LoopScreen}`);

                LocalScreenValues.forEach((LoopScreenFiles) => {
                    LocalReturnObject[dirNext][LoopScreen][path.parse(LoopScreenFiles).name] = JSON.parse(fs.readFileSync(`${LocalFolderPath}/${LoopScreen}/${LoopScreenFiles}`));
                });
            });
        };
    });

    return LocalReturnObject;
};

module.exports = { FoldersAsObject };