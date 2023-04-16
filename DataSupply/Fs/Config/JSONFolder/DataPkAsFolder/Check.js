let fs = require("fs");
let CommonCheck = require("../Check");

let ForExistence = ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalFromForFolderExistence = CommonCheck.ForJSONFolderExistence();

    LocalReturnData.KDataPath = LocalFromForFolderExistence.KDataPath;
    LocalReturnData.KDataJSONFolderPath = LocalFromForFolderExistence.KDataJSONFolderPath;
    LocalReturnData.DataPKPath = `${LocalReturnData.KDataJSONFolderPath}/${inDataPK}`;

    if (LocalFromForFolderExistence.KTF === false) {
        LocalReturnData.KReason = LocalFromForFolderExistence.KReason;

        return LocalReturnData;
    };

    try {
        if (fs.statSync(LocalReturnData.DataPKPath).isDirectory()) {
            LocalReturnData.KTF = true;
        };
    } catch (error) {
        LocalReturnData.KReason = `DataPK : ${inDataPK}: Folder not found!`;

    };

    return LocalReturnData;
};

// let LocalMockForExistence = ForExistence({ inDataPK: 16 });
// console.log("LocalMockForExistence : ", LocalMockForExistence);

module.exports = { ForExistence };
