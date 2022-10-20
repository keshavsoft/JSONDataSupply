
let CommonPullData = require("../../../../../../PullData/FromDataFolder/FromFolderAndFile");
let CommonPushData = require("../../../../../../PushData/ToDataFolder/FromFolderAndFile");
let CommonDataSupplyReturnDataFuncs = require("../../../../../CommonFuns/ReturnDataFuncs");
//let Common=require("../../../../../../PullData/FromDataFolder/FromFolderAndFile")

exports.FromRowPK = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inJsonPK, inDataPK, InsertKey, MainRowPK }) => {
    if (InsertKey.length > 0) {
        return await LocalSubTableDelete({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inJsonPK, inDataPK, InsertKey, MainRowPK });
    } else {
        return await LocalMainTableDelete({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inJsonPK, inDataPK });
    };
};

let LocalMainTableDelete = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inJsonPK, inDataPK }) => {
    let LocalFolderName = inFolderName;
    let LocalFileNameWithExtension = inFileNameWithExtension;
    let LocalItemName = inItemName;
    let LocalScreenName = inScreenName;
    let LocalJsonPK = inJsonPK;
    let LocalDataPK = inDataPK;
    let LocalUpdatedData;

    let LocallReturnData = { KTF: true };

    if (LocalDataPK > 0) {
        let LocalCommonFromData = await CommonPullData.FullJsonData({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inDataPK: LocalDataPK
        });

        if (LocalCommonFromData.KTF === false) {
            LocallReturnData.KReason = LocalCommonFromData.KReason;
            return await LocallReturnData;
        };

        if (("KResult" in LocalCommonFromData) === false) {
            LocallReturnData.KReason = "KResult not found!";
            return await LocallReturnData;
        };

        LocalUpdatedData = JSON.parse(JSON.stringify(LocalCommonFromData.KResult));

        if ((LocalItemName in LocalUpdatedData) === false) {
            LocallReturnData.KReason = `${LocalItemName} : ItemName not found!`;
            return await LocallReturnData;
        };

        if ((LocalJsonPK in LocalUpdatedData[LocalItemName]) === false) {
            LocallReturnData.KReason = `${LocalJsonPK} : not found in ${LocalItemName}!`;
            return await LocallReturnData;
        };

        delete LocalUpdatedData[LocalItemName][LocalJsonPK];

        let LocalFromUpdate = await CommonPushData.AsAsync({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inDataPK,
            inDataToUpdate: LocalUpdatedData,
            inOriginalData: LocalCommonFromData.KResult
        });

        if (LocalFromUpdate.KTF === false) {
            LocallReturnData.KReason = LocalFromUpdate.KReason;

            return await LocallReturnData;
        };

        let LocalFromReturnData = await CommonDataSupplyReturnDataFuncs.TableRowDelete({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalItemName,
            inScreenName: LocalScreenName,
            inJsonPK: LocalJsonPK,
            inDataPK: LocalDataPK
        });

        if (LocalFromReturnData.KTF === false) {
            LocallReturnData.KReason = LocalFromUpdate.KReason;

            return await LocallReturnData;
        };

        LocallReturnData.DataFromServer = LocalFromReturnData.DataFromServer;

        LocallReturnData.KTF = true;
    };

    return await LocallReturnData;
};

let LocalSubTableDelete = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inJsonPK, inDataPK, InsertKey, MainRowPK }) => {
    let LocalFolderName = inFolderName;
    let LocalFileNameWithExtension = inFileNameWithExtension;
    let LocalItemName = inItemName;
    let LocalScreenName = inScreenName;
    let LocalJsonPK = inJsonPK;
    let LocalDataPK = inDataPK;
    let LocalUpdatedData;
    let LocalMainRowPK = MainRowPK;

    let LocallReturnData = { KTF: true };

    if (LocalDataPK > 0) {
        let LocalCommonFromData = await CommonPullData.FullJsonData({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inDataPK: LocalDataPK
        });

        if (LocalCommonFromData.KTF === false) {
            LocallReturnData.KReason = LocalCommonFromData.KReason;
            return await LocallReturnData;
        };

        if (("KResult" in LocalCommonFromData) === false) {
            LocallReturnData.KReason = "KResult not found!";
            return await LocallReturnData;
        };

        LocalUpdatedData = JSON.parse(JSON.stringify(LocalCommonFromData.KResult));

        if ((LocalItemName in LocalUpdatedData) === false) {
            LocallReturnData.KReason = `${LocalItemName} : ItemName not found!`;
            return await LocallReturnData;
        };

        if ((MainRowPK in LocalUpdatedData[LocalItemName]) === false) {
            LocallReturnData.KReason = `${MainRowPK} : not found in ${LocalItemName}!`;
            return await LocallReturnData;
        };

        if ((InsertKey in LocalUpdatedData[LocalItemName][MainRowPK]) === false) {
            LocallReturnData.KReason = `${InsertKey} : not found in ${LocalItemName}.${MainRowPK}!`;
            return await LocallReturnData;
        };

        if ((LocalJsonPK in LocalUpdatedData[LocalItemName][MainRowPK][InsertKey]) === false) {
            LocallReturnData.KReason = `${LocalJsonPK} : not found in ${LocalItemName}.${MainRowPK}.${InsertKey}!`;
            return await LocallReturnData;
        };

        delete LocalUpdatedData[LocalItemName][MainRowPK][InsertKey][LocalJsonPK];

        let LocalFromUpdate = await CommonPushData.AsAsync({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inDataPK,
            inDataToUpdate: LocalUpdatedData,
            inOriginalData: LocalCommonFromData.KResult
        });

        if (LocalFromUpdate.KTF === false) {
            LocallReturnData.KReason = LocalFromUpdate.KReason;

            return await LocallReturnData;
        };

        let LocalFromReturnData = await CommonDataSupplyReturnDataFuncs.SubTableRowDelete({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalItemName,
            inScreenName: LocalScreenName,
            inJsonPK: LocalMainRowPK,
            inDataPK: LocalDataPK
        });

        if (LocalFromReturnData.KTF === false) {
            LocallReturnData.KReason = LocalFromUpdate.KReason;

            return await LocallReturnData;
        };

        LocallReturnData.DataFromServer = LocalFromReturnData.DataFromServer;

        LocallReturnData.KTF = true;
    };

    return await LocallReturnData;
};
