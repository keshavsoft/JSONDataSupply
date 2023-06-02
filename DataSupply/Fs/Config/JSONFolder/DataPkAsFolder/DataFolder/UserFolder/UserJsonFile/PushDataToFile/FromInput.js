const fs = require('fs-extra');
let CommonCheck = require("../Check");

let CreateFileWithData = ({ inFolderName, inFileNameOnly, inData, inDataPK }) => {
    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirCreate: "", DataFolder: true };

    let LocalFromCheck = CommonCheck.ForExistence({
        inFolderName,
        inFileNameOnly,
        inDataPK: LocalinDataPK
    });

    LocalReturnData = { ...LocalFromCheck };

    if (LocalReturnData.UserFolderPresent === false) {
        return LocalReturnData;
    };

    if (LocalFromCheck.KTF === false) {
        fs.writeFileSync(LocalFromCheck.UserJsonFilePath, JSON.stringify(inData));

        LocalReturnData.KTF = true;
    } else {
        LocalReturnData.FilePresent = true;
    }

    return LocalReturnData;
};

module.exports = {
    CreateFileWithData
};
