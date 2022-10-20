const fs = require('fs-extra');
let CommonAbsolutePath = require("../../../../DataPath");

let LocalCheckForExistence = ({ inFolderName, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalDataPathName = "Data";

    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
    LocalReturnData.DirPath = `${GlobalDataPath}/${inUserPK}/${LocalDataPathName}/${inFolderName}`

    try {
        if (fs.statSync(LocalReturnData.DirPath).isDirectory()) {
            LocalReturnData.KTF = true;
        };
    } catch (error) {

    };

    return LocalReturnData;
};

let StartFunc = async ({ inFolderName, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", DataFolder: true };
    let LocalFromCheck = LocalCheckForExistence({ inFolderName, inUserPK });

    if (LocalFromCheck.KTF === false) {
        fs.mkdirSync(LocalFromCheck.DirPath, {
            recursive: true
        });
        LocalReturnData.DirCreate = LocalFromCheck.DirPath;
        LocalReturnData.KTF = true;
    };

    return await LocalReturnData;
};

module.exports = { StartFunc };
