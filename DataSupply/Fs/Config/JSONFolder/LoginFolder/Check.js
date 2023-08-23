let fs = require("fs");
let CommonFromCheck = require("../Check");

let ForExistence = () => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalFromCheck = CommonFromCheck.ForJSONFolderExistence();
    LocalReturnData = { ...LocalFromCheck };
    LocalReturnData.KTF = false;

    LocalReturnData.LoginFolderPath = `${LocalReturnData.KDataJSONFolderPath}/Login`;

    if (LocalFromCheck.KTF === false) {
        return LocalReturnData;
    };

    try {
        if (fs.statSync(LocalReturnData.LoginFolderPath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "LoginFolderPath: not found!";
            LocalReturnData.KTF = false;
        };
    } catch (error) {
        LocalReturnData.KReason = "LoginFolderPath: not found!";
        LocalReturnData.KTF = false;
    };

    return LocalReturnData;
};



// let LocalMockForExistence = ForExistence();
// console.log("LocalMockForExistence : ", LocalMockForExistence);

module.exports = { ForExistence };
