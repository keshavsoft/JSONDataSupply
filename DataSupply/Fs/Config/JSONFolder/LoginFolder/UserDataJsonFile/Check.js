let fs = require("fs");
let CommonFromCheck = require("../Check");

let ForExistence = () => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalFromCheck = CommonFromCheck.ForExistence();
    // LocalReturnData.JSONFolderPath = LocalFromCheck.JSONFolderPath;
    // LocalReturnData.LoginFolderPath = LocalFromCheck.LoginFolderPath;

    LocalReturnData = { ...LocalFromCheck };
    LocalReturnData.JsonFileName = "UserData.json";
    LocalReturnData.KTF = false;

    LocalReturnData.UserDataJsonFilePath = `${LocalReturnData.LoginFolderPath}/${LocalReturnData.JsonFileName}`;

    // LocalReturnData.JsonFileName = LocalFromCheck.JsonFileName;
    // LocalReturnData.UserDataJsonFilePath = LocalFromCheck.UserDataJsonFilePath;

    if (LocalFromCheck.KTF === false) {
        return LocalReturnData;
    };


    try {
        if (fs.statSync(LocalReturnData.UserDataJsonFilePath)) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "UserDataJsonFilePath: not found!";
            LocalReturnData.KTF = false;
        };
    } catch (error) {
        LocalReturnData.KReason = "UserDataJsonFilePath: not found!";
        LocalReturnData.KTF = false;
    };

    return LocalReturnData;
};



// let LocalMockForExistence = ForExistence();
// console.log("LocalMockForExistence : ", LocalMockForExistence);

module.exports = { ForExistence };
