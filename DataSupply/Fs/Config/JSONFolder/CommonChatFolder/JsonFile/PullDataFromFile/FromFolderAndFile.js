let fs = require("fs");
let CommonFromCheck = require("../Check");

let StartFunc = ({ inFileNameOnly }) => {
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({ inFileNameOnly: LocalinFileNameOnly });

    LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF === false) {
        return LocalReturnData;
    };

    // LocalReturnData.UserJsonFilePath = LocalFromCommonFromCheck.UserJsonFilePath;

    try {
        let rawdata = fs.readFileSync(LocalReturnData.UserJsonFilePath);
        LocalReturnData.JsonData = JSON.parse(rawdata);
        LocalReturnData.KTF = true;
    } catch (error) {
        LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

module.exports = { StartFunc };
