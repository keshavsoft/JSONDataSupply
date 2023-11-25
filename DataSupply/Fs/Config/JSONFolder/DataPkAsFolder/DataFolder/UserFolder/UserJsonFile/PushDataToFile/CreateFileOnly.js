const fs = require('fs-extra');
let CommonCheck = require("../Check");

let StartFunc = ({ inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirCreate: "", DataFolder: true };

    let LocalFromCheck = CommonCheck.ForExistence({
        inFolderName,
        inFileNameOnly,
        inDataPK: LocalinDataPK
    });

    LocalReturnData = { ...LocalFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCheck.KTF === false) {
        try {
            fs.writeFileSync(LocalFromCheck.UserJsonFilePath, JSON.stringify({}));

            LocalReturnData.KTF = true;
        } catch (error) {
            console.log("error : ", error);
        };
    } else {
        LocalReturnData.FilePresent = true;
    }

    return LocalReturnData;
};

module.exports = {
    StartFunc
};
