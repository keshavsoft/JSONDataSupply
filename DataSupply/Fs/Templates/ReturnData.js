const fs = require('fs');
let CommonAbsolutePath = require("../DataPath");

let ReturnObject = ({ inUserPK }) => {
    let LocalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp();
    const LocalTemplatesPath = `${LocalDataPath}/${inUserPK}/Templates`;
    let LocalFilePath;
    const readDirMain = fs.readdirSync(LocalTemplatesPath);
    let LocalReturnObject = {};

    readDirMain.forEach((dirNext) => {
        if (fs.lstatSync(`${LocalTemplatesPath}/${dirNext}`).isDirectory()) {
            LocalFilePath = `${LocalTemplatesPath}/${dirNext}/Config/ReturnData/Default.json`;

            if (fs.existsSync(LocalFilePath)) {
                LocalReturnObject[dirNext] = JSON.parse(fs.readFileSync(LocalFilePath));

            };
        };
    });
    console.log("LocalReturnObject : ", LocalReturnObject);
    return LocalReturnObject;
};

//module.exports = { ReturnObject };

ReturnObject({ inUserPK: 1007 });