let _ = require("lodash");
//let CommonFromTableColumns = require("../../../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/TableColumns/PullData/AsArray");
let CommonFromDataFolder = require("../../../../../../../DataFolder/UserFolder/UserJsonFile/ItemName/PullData/FromFolderFileItemName");
let path = require("path");
let CommonFromTableColumns = require("../../../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/TableColumns/PullData/ForShowInTable");
let fs = require("fs");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {

        let LocalTableColumnsData = await LocalTableColumnsDataFunc({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK });
        let LocalJsonData = await LocalJsonDataFunc({ inFolderName, inFileNameWithExtension, inItemName, inDataPK });
        
        console.log("aaaaaaa : ", LocalJsonData); // 👉️ a

        //console.log("------ : ", map[0]);
    };

    return await LocalReturnObject;
};

let LocalTableColumnsDataFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalFolderName = inFolderName;
    let LocalFileNameWithExtension = inFileNameWithExtension;
    let LocalinItemName = inItemName;
    let LocalinScreenName = inScreenName;
    let LocalDataPK = inDataPK;
    let LocalReturnData;

    let LocalCommonFromTableColumns = await CommonFromTableColumns.ColumnsAsObject({
        inFolderName: LocalFolderName,
        inFileNameWithExtension: LocalFileNameWithExtension,
        inItemName: LocalinItemName,
        inScreenName: LocalinScreenName,
        inDataPK: LocalDataPK
    });

    if (LocalCommonFromTableColumns.KTF) {
        LocalReturnData = LocalCommonFromTableColumns.JsonData
    };

    return await LocalReturnData;
};

let LocalJsonDataFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inDataPK }) => {
    let LocalFolderName = inFolderName;
    let LocalFileNameWithExtension = inFileNameWithExtension;
    let LocalinItemName = inItemName;
    let LocalDataPK = inDataPK;
    let LocalReturnData;

    let LocalCommonFromDataFolder = await CommonFromDataFolder.ReturnAsArrayWithPK({
        inFolderName: LocalFolderName,
        inFileNameOnly: path.parse(LocalFileNameWithExtension).name,
        inItemName: LocalinItemName,
        inDataPK: LocalDataPK
    });

    if (LocalCommonFromDataFolder.KTF) {
        LocalReturnData = LocalCommonFromDataFolder.JsonData
    };

    return await LocalReturnData;
};

// StartFunc({
//     inFolderName: "Transactions",
//     inFileNameWithExtension: "GST-SALES.json",
//     inItemName: "GST-SALE",
//     inScreenName: "Create",
//     inDataPK: 1022
// }).then(p => {
//     console.log("pppp : ", p);
// });

module.exports = { StartFunc };
