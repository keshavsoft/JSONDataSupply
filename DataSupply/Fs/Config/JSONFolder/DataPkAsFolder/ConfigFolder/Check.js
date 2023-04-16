let fs = require("fs");
let CommonFromCheck = require("../Check.js");

let ForExistence = ({ inDataPK }) => {
    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalConfigPathName = "Config";

    let LocalCommonFromCheck = CommonFromCheck.ForExistence({ inDataPK: LocalinDataPK });
 
    LocalReturnData.KDataPath = LocalCommonFromCheck.KDataPath;
    LocalReturnData.KDataJSONFolderPath = LocalCommonFromCheck.KDataJSONFolderPath;
    LocalReturnData.DataPKPath = LocalCommonFromCheck.DataPKPath;
    LocalReturnData.DirPath = `${LocalReturnData.DataPKPath}/${LocalConfigPathName}`;
    
  //  console.log("111111111111 : ", LocalCommonFromCheck);

    if (LocalCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalCommonFromCheck.KReason;
        return LocalReturnData;
    };

    try {
        if (fs.statSync(LocalReturnData.DirPath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "File not found!";
        }
    } catch (error) {
        LocalReturnData.KReason = `Config Folder not found.`;
        // LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

let LocalReturnFolders = ({ inDataPath }) => {
    return fs.readdirSync(inDataPath).filter(function (file) {
        return fs.statSync(inDataPath + '/' + file).isDirectory();
    });
};

let FolderIsEmpty = ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalFromCommonCheck = ForExistence({ inDataPK });

    if (LocalFromCommonCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonCheck.KReason;
    };

    LocalReturnData.ConfigPath = LocalFromCommonCheck.DirPath;

    let LocalFoldersArray = LocalReturnFolders({ inDataPath: LocalReturnData.ConfigPath });

    if (LocalFoldersArray.length === 0) {
        LocalReturnData.KTF = true;

        return LocalReturnData;
    };

    return LocalReturnData;
};

// console.log("ForExistence : ", ForExistence({ inDataPK: 16 }));

module.exports = { ForExistence, FolderIsEmpty };
