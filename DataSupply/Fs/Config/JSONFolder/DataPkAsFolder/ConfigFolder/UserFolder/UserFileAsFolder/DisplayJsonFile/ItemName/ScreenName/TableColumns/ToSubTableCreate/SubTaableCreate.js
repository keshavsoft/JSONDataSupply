let CommonPullDataFromConfig = require("../../../../PullData/AsJson");
let CommonFromPushData = require("../../../../PushData/FromFoldFile");
let CommonColumnJsonFuncs = require("../../../../../../../../../../../../Fix/Json/SupplyJson");

let StartFunc = async ({ DataPK, FolderName, FileName, ItemName, ScreenName, columnName }) => {
    let localDataPK = DataPK;
    let localFolderName = FolderName;
    let localFileName = FileName;
    let localItemName = ItemName;
    let localScreenName = ScreenName;
    let localcolumnName = columnName;
    let LocalFromUpdate;
    let localsubtableColumnArray;
    let LocalReturnObject = { KTF: false, JsonData: {}, KReason: "" };

    let LocalFromPullData = await CommonPullDataFromConfig.StartFunc({ inFolderName: localFolderName, inFileNameOnly: localFileName, inDataPK: localDataPK });

    if (LocalFromPullData.KTF === false) {
        LocalReturnObject.KReason = LocalFromPullData.KReason
        return await LocalReturnObject;

    };

    let LocalNewColumnObject = CommonColumnJsonFuncs.TableColumn();
    let LocalNewTableInfoObject = CommonColumnJsonFuncs.TableInfo();

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromPullData.JsonData));

    if (localItemName in LocalNewData === false) {
        LocalReturnObject.KReason = "ItemName not found!";
        return LocalReturnObject;
    };


    if (localScreenName in LocalNewData[localItemName] === false) {
        LocalReturnObject.KReason = "ScreenName not found!";
        return LocalReturnObject;
    };

    if (("SubTableColumns" in LocalNewData[localItemName][localScreenName]) == false) {
        LocalNewData[localItemName][localScreenName].SubTableColumns = {};
    };

    if (localcolumnName in LocalNewData[localItemName][localScreenName].SubTableColumns) {
        LocalReturnObject.KReason = `${localcolumnName} Aldready found !`;
        return await LocalReturnObject;
    };

    if (("TableColumns" in LocalNewData[localItemName][localScreenName]) == false) {
        LocalReturnObject.KReason = "TableColumns not found!";
        return LocalReturnObject;
    };

    let LocalFindColumn = LocalNewData[localItemName][localScreenName].TableColumns.find(element => element.DataAttribute === localcolumnName);

    LocalFindColumn.DefaultValue = "Object";
    // DefaultValue

    if ((localcolumnName in LocalNewData[localItemName][localScreenName].SubTableColumns) === false) {
        LocalNewData[localItemName][localScreenName].SubTableColumns[localcolumnName] = {};
    };

    if (("TableColumns" in LocalNewData[localItemName][localScreenName].SubTableColumns[localcolumnName]) === false) {
        LocalNewColumnObject.DisplayName = "FK"
        LocalNewColumnObject.DataAttribute = "FK"
        localsubtableColumnArray = LocalNewData[localItemName][localScreenName].SubTableColumns[localcolumnName].TableColumns = [];
        localsubtableColumnArray.push(LocalNewColumnObject);
    };

    if (("TableInfo" in LocalNewData[localItemName][localScreenName].SubTableColumns[localcolumnName]) === false) {
        LocalNewData[localItemName][localScreenName].SubTableColumns[localcolumnName].TableInfo = LocalNewTableInfoObject;
    };

    LocalFromUpdate = await CommonFromPushData.StartFunc({
        inFolderName: localFolderName,
        inFileNameWithExtension: localFileName,
        inDataPK: localDataPK,
        inDataToUpdate: LocalNewData,
        inOriginalData: LocalFromPullData.JsonData
    });

    if (LocalFromUpdate.KTF) {
        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;

    return await LocalReturnObject;
};

let mockFunc = () => {
    // InvGrid

    StartFunc({
        DataPK: "1023", FolderName: "Transactions", FileName: "GST-SALES",
        ItemName: "GST-SALE",
        ScreenName: "Create",
        columnName: "InvGrid"
    }).then(FromPromise => {
        console.log("FromPromise : ", FromPromise);
    });
};

// mockFunc();

module.exports = { StartFunc };