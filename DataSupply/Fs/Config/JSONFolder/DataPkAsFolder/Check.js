let fs = require("fs");
let CommonCheck = require("../Check");

let ForExistence = ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalFromCommonCheck = CommonCheck.ForExistence();

    if (LocalFromCommonCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonCheck.KReason;

        return LocalReturnData;
    };

    LocalReturnData.JSONFolderPath = LocalFromCommonCheck.JSONFolderPath;
    LocalReturnData.DataPKPath = `${LocalFromCommonCheck.JSONFolderPath}/${inDataPK}`;

    try {
        if (fs.statSync(LocalReturnData.DataPKPath).isDirectory()) {
            LocalReturnData.KTF = true;
        };
    } catch (error) {

    };

    return LocalReturnData;
};

// let LocalMockForExistence = ForExistence({ inDataPK: 16 });
// console.log("LocalMockForExistence : ", LocalMockForExistence);

module.exports = { ForExistence };
