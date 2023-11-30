let fs = require("fs");
let CommonFromCheck = require("../Check");

let ForExistence = () => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalFromCheck = CommonFromCheck.ForJSONFolderExistence();
    LocalReturnData = { ...LocalFromCheck };
    LocalReturnData.KTF = false;

    LocalReturnData.CommonChatFolderPath = `${LocalReturnData.KDataJSONFolderPath}/CommonChat`;

    if (LocalFromCheck.KTF === false) {
        return LocalReturnData;
    };

    try {
        if (fs.statSync(LocalReturnData.CommonChatFolderPath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "CommonChatFolderPath: not found!";
            LocalReturnData.KTF = false;
        };
    } catch (error) {
        LocalReturnData.KReason = "CommonChatFolderPath: not found!";
        LocalReturnData.KTF = false;
    };

    return LocalReturnData;
};



// let LocalMockForExistence = ForExistence();
// console.log("LocalMockForExistence : ", LocalMockForExistence);

module.exports = { ForExistence };
