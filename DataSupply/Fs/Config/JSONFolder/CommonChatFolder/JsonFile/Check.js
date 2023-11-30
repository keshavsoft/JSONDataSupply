let fs = require("fs");
let CommonFromCheck = require("../Check");

let ForExistence = ({ inFileNameOnly }) => {
    let LocalinFileNameOnly = inFileNameOnly;

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence();
    let LocalReturnData = { ...LocalFromCommonFromCheck };

    LocalReturnData.KTF = false;
    LocalReturnData.UserJsonFilePath = `${LocalReturnData.CommonChatFolderPath}/${LocalinFileNameOnly}.json`;

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.UserFolderPresent = false;
        return LocalReturnData;
    };

    try {
        if (fs.existsSync(LocalReturnData.UserJsonFilePath)) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = `Json File name : ${LocalinFileNameOnly} not found in Chat Folder`;
        }
    } catch (error) {
        LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

module.exports = { ForExistence };
