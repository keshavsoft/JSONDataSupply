let fs = require("fs");
let CommonFromCheck = require("./CheckRowPkAsFolder");

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inRowPk, inDataPK }) => {
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
        inRowPk: LocalRowPk,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF) {
        LocalReturnData.KReason = "RowPk Folder already present!";
        return LocalReturnData;
    };

    LocalReturnData.FolderPath = LocalFromCommonFromCheck.FolderPath;
    LocalReturnData.UserJsonFileAsFolderPath = LocalFromCommonFromCheck.UserJsonFileAsFolderPath;
    LocalReturnData.ItemNameAsFolderPath = LocalFromCommonFromCheck.ItemNameAsFolderPath;
    LocalReturnData.ImagesFolderPath = LocalFromCommonFromCheck.ImagesFolderPath;
    LocalReturnData.RowPkAsFolderPath = LocalFromCommonFromCheck.RowPkAsFolderPath;

    try {
        fs.mkdirSync(LocalReturnData.RowPkAsFolderPath, {
            recursive: true
        });
        
        LocalReturnData.KTF = true;
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

module.exports = { StartFunc };
