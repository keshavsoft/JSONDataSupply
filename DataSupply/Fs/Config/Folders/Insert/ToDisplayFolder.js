const fs = require('fs-extra');
let CommonCheck = require("../Check");

let CreateConfigFolder = async ({ inFolderName, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", ConfigFolder: true };
    let LocalFromCheck = CommonCheck.ForConfig({ inFolderName, inUserPK });
    
    if (LocalFromCheck.KTF === false) {
        fs.mkdirSync(LocalFromCheck.DirPath, {
            recursive: true
        });
        LocalReturnData.DirCreate = LocalFromCheck.DirPath;
        LocalReturnData.KTF = true;
    };

    return await LocalReturnData;
};

module.exports = { CreateConfigFolder };
