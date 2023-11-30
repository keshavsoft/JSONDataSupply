const fs = require('fs-extra');
let CommonCheck = require("../Check");

let StartFunc = ({ inFileNameOnly, inDataToUpdate }) => {
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalReturnData = { KTF: false, DirCreate: "", DataFolder: true };

    let LocalFromCheck = CommonCheck.ForExistence({ inFileNameOnly: LocalinFileNameOnly });

    LocalReturnData = { ...LocalFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCheck.KTF === false) {
        return LocalReturnData;
    };

    try {
        fs.writeFileSync(LocalFromCheck.UserJsonFilePath, JSON.stringify(inDataToUpdate));

        LocalReturnData.KTF = true;
    } catch (error) {
        console.log("error : ", error);
    };

    return LocalReturnData;
};

module.exports = {
    StartFunc
};
