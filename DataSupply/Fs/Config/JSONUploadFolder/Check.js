let fs = require("fs");
let CommonAbsolutePath = require("../../DataPathForUpload");
let CommonCheckKDataFolder = require("../CheckKDataFolderForUpload");


let ForExistence = () => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
    LocalReturnData.JSONFolderPath = GlobalDataPath;
    console.log("GlobalDataPath:",GlobalDataPath);

    try {
        if (fs.statSync(LocalReturnData.JSONFolderPath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "JSONFolderPath: not found!";
        }
    } catch (error) {
        LocalReturnData.KReason = "JSONFolderPath: not found!";
    };

    return LocalReturnData;
};

let ForJSONFolderExistence = () => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalCommonCheckDataPK = CommonCheckKDataFolder.ForExistence();
    LocalReturnData.KDataPath = LocalCommonCheckDataPK.KDataPath;
    LocalReturnData.KDataJSONFolderPath = `${LocalReturnData.KDataPath}/JSON`;

    if (LocalCommonCheckDataPK.KTF === false) {
        LocalReturnData.KReason = LocalCommonCheckDataPK.KReason;
        return LocalReturnData;
    };

    try {
        if (fs.statSync(LocalReturnData.KDataJSONFolderPath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = `KDataJSONFolderPath: not found!`;
        };
    } catch (error) {
        LocalReturnData.KReason = `KDataJSONFolderPath: not found!`;
    };

    return LocalReturnData;
};

// let LocalMockForExistence = ForJSONFolderExistence();
// console.log("LocalMockForExistence : ", LocalMockForExistence);

module.exports = {
    ForExistence,
    ForJSONFolderExistence
};
