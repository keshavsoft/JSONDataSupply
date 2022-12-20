let fs = require("fs");
let CommonFromCheck = require("../Check");

let ForExistence = ({ inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalFileName = "PrintFiles.json";

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    LocalReturnData.JsonFilePath = LocalFromCommonFromCheck.JsonFilePath;
    LocalReturnData.PrintFilesPath = `${LocalFromCommonFromCheck.JsonFilePath}/${LocalFileName}`;

    try {
        if (fs.statSync(LocalReturnData.PrintFilesPath)) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "File not found!";
        }
    } catch (error) {
        LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

// console.log("ForExistence : ", ForExistence({
//     inFolderName: "Masters",
//     inFileNameOnly: "Customers",
//     inDataPK: 16
// }));

module.exports = { ForExistence };
