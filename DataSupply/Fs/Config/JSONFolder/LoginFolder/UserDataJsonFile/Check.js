let fs = require("fs");
let CommonFromCheck = require("../Check");

let ForExistence = () => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalFromCheck = CommonFromCheck.ForExistence();
    LocalReturnData.JSONFolderPath = LocalFromCheck.JSONFolderPath;
    LocalReturnData.LoginFolderPath = LocalFromCheck.LoginFolderPath;
    LocalReturnData.JsonFileName = "UserData.json";

    LocalReturnData.UserDataJsonFilePath = `${LocalFromCheck.LoginFolderPath}/${LocalReturnData.JsonFileName}`;

    try {
        if (fs.statSync(LocalReturnData.UserDataJsonFilePath)) {
            LocalReturnData.KTF = true;
        };
    } catch (error) {

    };

    return LocalReturnData;
};



// let LocalMockForExistence = ForExistence();
// console.log("LocalMockForExistence : ", LocalMockForExistence);

module.exports = { ForExistence };
