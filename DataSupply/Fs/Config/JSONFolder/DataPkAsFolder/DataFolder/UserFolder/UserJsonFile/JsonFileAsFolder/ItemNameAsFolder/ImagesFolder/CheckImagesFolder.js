let fs = require("fs");
let CommonFromCheck = require("../CheckItemName");

let ForExistence = ({ inFolderName, inFileNameOnly, inItemName, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalItemName = inItemName;
    let LocalImageFolderName = "Images";

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inFolderName: LocalinFolderName,
        inFileNameOnly: inFileNameOnly,
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
    LocalReturnData.ImagesFolderPath = `${LocalFromCommonFromCheck.ItemNameAsFolderPath}/${LocalImageFolderName}`;

    try {
        if (fs.statSync(LocalReturnData.ImagesFolderPath).isDirectory()) {
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
