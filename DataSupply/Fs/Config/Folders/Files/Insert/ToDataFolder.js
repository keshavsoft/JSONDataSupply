const fs = require('fs-extra');
let CommonCheck = require("../Check");
let CommonCheckInDataFolder = require("../Check/InDataFolder");

let CreateDataFolder = async ({ inFolderName, inFileNameWithExtension, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", DataFolder: true };
    let LocalFromCheck = await CommonCheckInDataFolder.StartFunc({
        inFolderName,
        inFileNameWithExtension, inUserPK
    });

    if (LocalFromCheck.KTF) {
        LocalReturnData.KReason = LocalFromCheck.KReason;
    };

    fs.writeFileSync(LocalFromCheck.FilePath, JSON.stringify({}));
    LocalReturnData.DirCreate = LocalFromCheck.DirPath;
    LocalReturnData.FilePath = LocalFromCheck.FilePath;
    LocalReturnData.KResult = "File created successfully...";

    LocalReturnData.KTF = true;

    return await LocalReturnData;
};

let CreateFileWithData = async ({ inFolderName, inFileNameWithExtension, inData, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", DataFolder: true };
    let LocalFromCheck = CommonCheck.ForFile({ inFolderName, inFileNameWithExtension, inUserPK });

    if (LocalFromCheck.KTF === false) {
        fs.writeFileSync(LocalFromCheck.FilePath, JSON.stringify(inData));
        LocalReturnData.DirCreate = LocalFromCheck.DirPath;
        LocalReturnData.FilePath = LocalFromCheck.FilePath;

        LocalReturnData.KTF = true;
    } else {
        LocalReturnData.FilePresent = true;
    }

    return await LocalReturnData;
};

module.exports = {
    CreateDataFolder,
    CreateFileWithData
};
