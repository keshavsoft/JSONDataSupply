let CommonPullData = require("../../../Fs/Config/Folders/Files/PullData/FromDataFolder/FromFolderAndFile");
let CommonPushData = require("../../../Fs/Config/Folders/Files/PushData/ToDataFolder/FromFolderAndFile");

exports.SubTableDelete = async ({ inFolderName, inFileNameWithExtension, inItemName, inJsonPK, inDataPK, InsertKey, MainRowPK }) => {
    let LocalFolderName = inFolderName;
    let LocalFileNameWithExtension = inFileNameWithExtension;
    let LocalItemName = inItemName;
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

        if ((LocalMainRowPK in LocalUpdatedData[LocalItemName]) === false) {
            LocallReturnData.KReason = `${LocalMainRowPK} : not found in ${LocalItemName}!`;
            return await LocallReturnData;
        };

        if ((InsertKey in LocalUpdatedData[LocalItemName][LocalMainRowPK]) === false) {
            LocallReturnData.KReason = `${InsertKey} : not found in ${LocalItemName}.${LocalMainRowPK}!`;
            return await LocallReturnData;
        };

        if ((LocalJsonPK in LocalUpdatedData[LocalItemName][LocalMainRowPK][InsertKey]) === false) {
            LocallReturnData.KReason = `${LocalJsonPK} : not found in ${LocalItemName}.${LocalMainRowPK}.${InsertKey}!`;
            LocallReturnData.KTF = false;
            return await LocallReturnData;
        };

        delete LocalUpdatedData[LocalItemName][LocalMainRowPK][InsertKey][LocalJsonPK];

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

        LocallReturnData.KTF = true;
    };

    return await LocallReturnData;
};
