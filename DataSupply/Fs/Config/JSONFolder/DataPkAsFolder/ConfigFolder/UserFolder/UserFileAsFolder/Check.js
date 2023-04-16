let fs = require("fs");
let CommonFromCheck = require("../Check");

let ForExistence = ({ inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinDataPK = inDataPK;
    //    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inFolderName: LocalinFolderName,
        inDataPK: LocalinDataPK
    });

    let LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;
    
    LocalReturnData.JsonFilePath = `${LocalFromCommonFromCheck.FolderPath}/${inFileNameOnly}`;

    // LocalReturnData.KDataPath = LocalFromCommonFromCheck.KDataPath;
    // LocalReturnData.KDataJSONFolderPath = LocalFromCommonFromCheck.KDataJSONFolderPath;
    // LocalReturnData.DataPKPath = LocalFromCommonFromCheck.DataPKPath;
    // LocalReturnData.DirPath = LocalFromCommonFromCheck.DirPath;

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    try {
        if (fs.statSync(LocalReturnData.JsonFilePath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            // LocalReturnData.KReason = "File not found!";
            LocalReturnData.KReason = "JsonFilePath not found!";
        }
    } catch (error) {
        LocalReturnData.KReason = "JsonFilePath not found!";
        // LocalReturnData.KReason = error;
    };
    
    return LocalReturnData;
};

// console.log("ForExistence : ", ForExistence({
//     inFolderName: "Masters",
//     inFileNameOnly: "Customers",
//     inDataPK: 16
// }));

module.exports = { ForExistence };
