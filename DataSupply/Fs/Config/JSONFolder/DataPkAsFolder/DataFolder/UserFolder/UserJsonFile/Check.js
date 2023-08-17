let fs = require("fs");
let CommonFromCheck = require("../Check");

let ForExistence = ({ inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;

    let LocalinDataPK = inDataPK;

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistenceOfUserFolder({
        inFolderName: LocalinFolderName,
        inDataPK: LocalinDataPK
    });
    let LocalReturnData = { ...LocalFromCommonFromCheck };

    LocalReturnData.KTF = false;
    LocalReturnData.UserJsonFilePath = `${LocalReturnData.FolderPath}/${LocalinFileNameOnly}.json`;

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.UserFolderPresent = false;
        return LocalReturnData;
    };

    try {
        if (fs.existsSync(LocalReturnData.UserJsonFilePath)) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = `Json File name : ${LocalinFileNameOnly} not found in Data Folder : ${LocalinFolderName}`;
        }
    } catch (error) {
        LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

module.exports = { ForExistence };
