const fs = require('fs-extra');
let CommonCheck = require("../Check");

let CreateFileWithData = async ({ inFolderName, inFileNameOnly, inData, inDataPK }) => {
    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirCreate: "", DataFolder: true };

    let LocalFromCheck = CommonCheck.ForExistence({
        inFolderName,
        inFileNameOnly,
        inDataPK: LocalinDataPK
    });

    LocalReturnData.FolderPath = LocalFromCheck.FolderPath;
    LocalReturnData.UserJsonFilePath = LocalFromCheck.UserJsonFilePath;

    if (LocalFromCheck.KTF === false) {
        fs.writeFileSync(LocalFromCheck.UserJsonFilePath, JSON.stringify(inData));

        LocalReturnData.KTF = true;
    } else {
        LocalReturnData.FilePresent = true;
    }

    return await LocalReturnData;
};

module.exports = {
    CreateFileWithData
};
