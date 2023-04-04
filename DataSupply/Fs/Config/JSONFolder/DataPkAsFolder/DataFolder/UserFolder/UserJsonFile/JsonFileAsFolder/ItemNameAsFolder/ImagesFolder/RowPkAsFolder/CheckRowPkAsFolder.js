let fs = require("fs");
let CommonFromCheck = require("../CheckImagesFolder");

let ForExistence = ({ inFolderName, inFileNameOnly, inItemName, inRowPk, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalItemName = inItemName;
    let LocalRowPk = inRowPk;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalItemName,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    LocalReturnData.FolderPath = LocalFromCommonFromCheck.FolderPath;
    LocalReturnData.UserJsonFileAsFolderPath = LocalFromCommonFromCheck.UserJsonFileAsFolderPath;
    LocalReturnData.ItemNameAsFolderPath = LocalFromCommonFromCheck.ItemNameAsFolderPath;
    LocalReturnData.ImagesFolderPath = LocalFromCommonFromCheck.ImagesFolderPath;
    LocalReturnData.RowPkAsFolderPath = `${LocalFromCommonFromCheck.ImagesFolderPath}/${LocalRowPk}`;

    try {
        if (fs.statSync(LocalReturnData.RowPkAsFolderPath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "Images Folder not found!";
        }
    } catch (error) {
        LocalReturnData.KReason = "Images Folder not found!";
    };

    return LocalReturnData;
};


let LocalMockFunc = () => {
    let LocalFrom = ForExistence({
        inFolderName: "Masters",
        inFileNameOnly: "Items",
        inItemName: "ItemName",
        inDataPK: 901
    });
    console.log("LocalFrom : ", LocalFrom);
};

// LocalMockFunc();

// console.log("ForExistence : ", ForExistence({
//     inFolderName: "Masters",
//     inFileNameOnly: "Customers",
//     inDataPK: 16
// }));

module.exports = { ForExistence };
