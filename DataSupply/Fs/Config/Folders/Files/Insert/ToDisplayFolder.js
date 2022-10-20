const fs = require('fs-extra');
let CommonCheck = require("../Check");
let path = require("path");

let CreateConfigFolder = async ({ inFolderName, inFileNameWithExtension, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", ConfigFolder: true };

    try {
        let LocalFromCheck = CommonCheck.InConfig({
            inFolderName,
            inFileNameOnly: path.basename(inFileNameWithExtension, '.json'), inUserPK
        });

        if (LocalFromCheck.KTF === false) {
            fs.mkdirSync(LocalFromCheck.FolderPath, {
                recursive: true
            });

            fs.writeFileSync(LocalFromCheck.FilePath, JSON.stringify({}));

            LocalReturnData.DirCreate = LocalFromCheck.DirPath;
            LocalReturnData.FilePath = LocalFromCheck.FilePath;
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.FilePath = LocalFromCheck.FilePath;
            LocalReturnData.AlreadyPresent = true;
        };
    } catch (error) {
        console.log("error : ", error);
    };

    return await LocalReturnData;
};

let CreateConfigFolderAndInsertContent = async ({ inFolderName, inFileNameWithExtension, inContent, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", ConfigFolder: true };

    try {
        let LocalFromCheck = CommonCheck.InConfig({
            inFolderName,
            inFileNameOnly: path.basename(inFileNameWithExtension, '.json'), inUserPK
        });

        if (LocalFromCheck.KTF === false) {
            fs.mkdirSync(LocalFromCheck.FolderPath, {
                recursive: true
            });

            fs.writeFileSync(LocalFromCheck.FilePath, JSON.stringify(inContent));

            LocalReturnData.DirCreate = LocalFromCheck.DirPath;
            LocalReturnData.FilePath = LocalFromCheck.FilePath;
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.FilePath = LocalFromCheck.FilePath;
            LocalReturnData.AlreadyPresent = true;
        };
    } catch (error) {
        console.log("error : ", error);
    };

    return await LocalReturnData;
};

module.exports = {
    CreateConfigFolder,
    CreateConfigFolderAndInsertContent
};
