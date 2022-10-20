const fs = require('fs-extra');
let CommonCheck = require("../Check");

let CreateDataFolder = async ({ inFolderName, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", DataFolder: true };
    let LocalFromCheck = CommonCheck.ForExistence({ inFolderName, inUserPK });

    if (LocalFromCheck.KTF === false) {
        fs.mkdirSync(LocalFromCheck.DirPath, {
            recursive: true
        });
        LocalReturnData.DirCreate = LocalFromCheck.DirPath;
        LocalReturnData.KTF = true;
    };

    return await LocalReturnData;
};

module.exports = { CreateDataFolder };
