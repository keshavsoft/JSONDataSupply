let fs = require("fs");
let CommonFromCheck = require("../../Check");

let ForExistence = ({ inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inFolderName: LocalinFolderName,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    LocalReturnData.FolderPath = LocalFromCommonFromCheck.FolderPath;
    LocalReturnData.UserJsonFileAsFolderPath = `${LocalFromCommonFromCheck.FolderPath}/${LocalinFileNameOnly}`;
 //   console.log("aaaaaaaaaaaaaaa : ", fs.statSync(LocalReturnData.UserJsonFileAsFolderPath));
    try {
        if (fs.statSync(LocalReturnData.UserJsonFileAsFolderPath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "JsonFileAsFolderPath not found!";
        }
    } catch (error) {
        LocalReturnData.KReason =  "JsonFileAsFolderPath not found!";
    };

    return LocalReturnData;
};

// console.log("ForExistence : ", ForExistence({
//     inFolderName: "Masters",
//     inFileNameOnly: "Customers",
//     inDataPK: 16
// }));

module.exports = { ForExistence };
