let fs = require("fs");
let CommonFromCheck = require("../CheckJsonFileAsFolder");

let ForExistence = ({ inFolderName, inFileNameOnly, inItemName, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalItemName = inItemName;

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

    LocalReturnData.FolderPath = LocalFromCommonFromCheck.FolderPath;
    LocalReturnData.UserJsonFileAsFolderPath = LocalFromCommonFromCheck.UserJsonFileAsFolderPath;
    LocalReturnData.ItemNameAsFolderPath = `${LocalFromCommonFromCheck.UserJsonFileAsFolderPath}/${LocalItemName}`;

    try {
        if (fs.statSync(LocalReturnData.ItemNameAsFolderPath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "ItemNameAsFolderPath not found!";
        }
    } catch (error) {
        LocalReturnData.KReason = "ItemNameAsFolderPath not found!";
    };

    return LocalReturnData;
};

// console.log("ForExistence : ", ForExistence({
//     inFolderName: "Masters",
//     inFileNameOnly: "Customers",
//     inDataPK: 16
// }));

module.exports = { ForExistence };
