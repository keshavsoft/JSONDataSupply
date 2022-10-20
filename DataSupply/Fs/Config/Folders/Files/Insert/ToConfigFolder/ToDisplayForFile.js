const fs = require('fs-extra');
let CommonCheck = require("../../Check/ConfigFromFile");
let path = require("path");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", ConfigFolder: true };

    try {
        let LocalFromCheck = CommonCheck.StartFunc({
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

module.exports = {
    StartFunc
};
