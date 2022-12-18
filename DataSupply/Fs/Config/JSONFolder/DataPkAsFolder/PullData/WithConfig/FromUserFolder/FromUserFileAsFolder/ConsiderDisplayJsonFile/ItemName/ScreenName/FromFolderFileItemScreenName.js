let _ = require("lodash");
let CommonFromTableColumns = require("../../../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/TableColumns/PullData/AsArray");
let CommonFromDataFolder = require("../../../../../../../DataFolder/UserFolder/UserJsonFile/ItemName/PullData/FromFolderFileItemName");
let path = require("path");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {

        let LocalTableColumnsData = await LocalTableColumnsDataFunc({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK });
        let LocalJsonData = await LocalJsonDataFunc({ inFolderName, inFileNameWithExtension, inItemName, inDataPK });

        // let LocalCommonFromDataFolder = CommonFromDataFolder.StartFunc({
        //     inFolderName: LocalFolderName,
        //     inFileNameOnly: path.parse(LocalFileNameWithExtension).name,
        //     inItemName: LocalinItemName,
        //     inDataPK: LocalDataPK
        // })


        console.log("LocalTableColumnsData : ", LocalJsonData);

    };

    return await LocalReturnObject;
};

let StartFunc1 = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;
        let LocalinItemName = inItemName;
        let LocalinScreenName = inScreenName;

        let LocalCommonFromTableColumns = await CommonFromTableColumns.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalinItemName,
            inScreenName: LocalinScreenName,
            inDataPK: LocalDataPK
        });

        if (LocalCommonFromTableColumns.KTF === false) {
            LocalReturnObject.KReason = LocalCommonFromTableColumns.KReason;
            return await LocalReturnObject;
        };

        let LocalCommonFromDataFolder = CommonFromDataFolder.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameOnly: path.parse(LocalFileNameWithExtension).name,
            inItemName: LocalinItemName,
            inDataPK: LocalDataPK
        })


        console.log("LocalCommonFromDataFolder : ", LocalCommonFromDataFolder);

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

    let LocalCommonFromTableColumns = await CommonFromTableColumns.StartFunc({
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

    let LocalCommonFromDataFolder = await CommonFromDataFolder.StartFunc({
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

StartFunc({
    inFolderName: "Masters",
    inFileNameWithExtension: "Customers.json",
    inItemName: "CustomersName",
    inScreenName: "Create",
    inDataPK: 16
}).then(p => {
    console.log("pppp : ", p);
});

module.exports = { StartFunc };
