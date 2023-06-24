let CommonPullData = require("../../../Fs/Config/Folders/Files/PullData/FromDataFolder/FromFolderAndFile");
let CommonPushData = require("../../../Fs/Config/Folders/Files/PushData/ToDataFolder/FromFolderAndFile");

let CommonDataSupplyReturnDataFuncs = require("../../../Fs/Config/Folders/Files/ConfigFromDisplayJson/Items/Screens/PullData/FromReturnDataJson/FromFoldFileItemScreen");

exports.SubTableDelete = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inJsonPK, inDataPK, InsertKey, MainRowPK }) => {
    let LocalFolderName = inFolderName;
    let LocalFileNameWithExtension = inFileNameWithExtension;
    let LocalItemName = inItemName;
    let LocalScreenName = inScreenName;
    let LocalJsonPK = inJsonPK;
    let LocalDataPK = inDataPK;
    let LocalUpdatedData;
    let LocalMainRowPK = MainRowPK;

    let LocallReturnData = { KTF: true };
    //console.log("aaaaaaaaaaa", inFolderName, inFileNameWithExtension, inItemName, inScreenName, inJsonPK, inDataPK, InsertKey, MainRowPK);
    if (LocalDataPK > 0) {
        let LocalCommonFromData = await CommonPullData.FullJsonData({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inDataPK: LocalDataPK
        });
        //   console.log("bbbbbb", LocalCommonFromData);

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
            LocallReturnData.KTF = false;
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
        console.log("ddddddddddddddddddddddddd");
        let LocalFromReturnData = await CommonDataSupplyReturnDataFuncs.SubTableRowDelete({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalItemName,
            inScreenName: LocalScreenName,
            inJsonPK: LocalMainRowPK,
            inDataPK: LocalDataPK
        });
        console.log("LocalFromReturnData : ", LocalFromReturnData);
        if (LocalFromReturnData.KTF === false) {
            LocallReturnData.KReason = LocalFromUpdate.KReason;

            return await LocallReturnData;
        };

        LocallReturnData.DataFromServer = LocalFromReturnData.DataFromServer;

        LocallReturnData.KTF = true;
    };

    return await LocallReturnData;
};
