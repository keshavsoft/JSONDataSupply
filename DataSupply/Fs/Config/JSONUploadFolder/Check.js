let fs = require("fs");
let CommonAbsolutePath = require("../../DataPath");
let CommonCheckKDataFolder = require("../CheckKDataFolder");

let ForExistence = () => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalFromKData = CommonCheckKDataFolder.ForExistence();
    LocalReturnData = { ...LocalFromKData };

    if (LocalReturnData.KTF === false) {
        return LocalReturnData;
    };

    LocalReturnData.DataUploadPath = `${LocalReturnData.KDataPath}/JSON-UpLoad`;
    LocalReturnData.KTF = false;

    try {
        if (fs.statSync(LocalReturnData.DataUploadPath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "DataUploadPath: not found!";
        }
    } catch (error) {
        LocalReturnData.KReason = "DataUploadPath: not found!";
    };
    
    return LocalReturnData;
};

const MockLockFunc = () => {
    let LocalFromMock = ForExistence();
    console.log("LocalFromMock : ", LocalFromMock);
};

// MockLockFunc();

module.exports = {
    ForExistence
};
