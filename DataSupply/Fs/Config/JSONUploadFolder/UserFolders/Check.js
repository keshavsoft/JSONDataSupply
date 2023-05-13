let fs = require("fs");
let CommonCheckKDataFolder = require("../Check");

let StartFunc = ({ inFolderName }) => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalFromKData = CommonCheckKDataFolder.ForExistence();

    if (LocalFromKData.KTF === false) {
        LocalReturnData.KReason = LocalFromKData.KReason;

        return LocalReturnData;
    };

    LocalReturnData.FolderPath = `${LocalFromKData.DataUploadPath}/${inFolderName}`
    console.log("LocalReturnData:",LocalReturnData);


    try {
        if (fs.statSync(LocalReturnData.FolderPath).isDirectory()) {
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
    let LocalFromMock = StartFunc({ inFolderName: 1022 });
    console.log("LocalFromMock : ", LocalFromMock);
};

// MockLockFunc();

module.exports = {
    StartFunc
};
