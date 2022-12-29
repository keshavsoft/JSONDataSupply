let CommonFromPullDataFromFile = require("../../../PullDataFromFile/FromFolderAndFile");
let CommonFromPushDataToFile = require("../../../PushDataToFile/FolderAndFile");
let CommonFromServerSideChecks = require("../ServerSideChecks/CheckBeforeSave");
let CommonFromConfigFolderTableColumns = require("../../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/TableColumns/PullData/AsArray");

let StartFunc = async ({ inFolderName, inFileNameOnly, inItemName, inScreenName, inDataPK, inDataToUpdate, inJsonPk }) => {

    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;
    let LocalDataToUpdate = inDataToUpdate;
    let LocalScreenName = inScreenName;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromPullDataFromFile.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    if ((LocalinItemName in LocalFromCommonFromCheck.JsonData) === false) {
        LocalReturnData.KReason = `Item Name : ${LocalinItemName} not found!`;
        return LocalReturnData;
    };

    if ((inJsonPk in LocalFromCommonFromCheck.JsonData[LocalinItemName]) === false) {
        LocalReturnData.KReason = `RowPK : ${inJsonPk} is not found in data!`;
        return LocalReturnData;
    };

    let LocalConfigTableColumns = await CommonFromConfigFolderTableColumns.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameWithExtension: `${LocalinFileNameOnly}.json`,
        inItemName: LocalinItemName,
        inScreenName: LocalScreenName,
        inDataPK: LocalinDataPK
    });
    //console.log("update-----------", LocalConfigTableColumns);
    if (LocalConfigTableColumns.KTF === false) {
        LocalReturnData.KReason = LocalConfigTableColumns.KReason;
        return await LocalReturnData;
    };

    let LocalFromCheck = await CommonFromServerSideChecks.ServerSideCheckAsync({
        inItemName: LocalinItemName,
        inUserData: LocalFromCommonFromCheck.JsonData[LocalinItemName],
        inConfigTableColumns: LocalConfigTableColumns.JsonData,
        inDataPK: LocalinDataPK,
        inObjectToInsert: LocalDataToUpdate
    });

    if (LocalFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCheck.KReason;
        return await LocalReturnData;
    };

    //console.log("LocalFromCheck : ", LocalFromCheck, LocalDataToUpdate);
    LocalFromCommonFromCheck.JsonData[LocalinItemName][inJsonPk] = {
        ...LocalFromCommonFromCheck.JsonData[LocalinItemName][inJsonPk],
        ...LocalDataToUpdate
    };

    // let LocalNewPk = LocalGeneratePk({ inDataWithKey: LocalFromCommonFromCheck.JsonData[LocalinItemName] });
    // LocalFromCommonFromCheck.JsonData[LocalinItemName][LocalNewPk] = inDataToInsert;

    let LocalFromPush = await CommonFromPushDataToFile.InsertToJson({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK,
        inDataToUpdate: LocalFromCommonFromCheck.JsonData,
        inOriginalData: ""
    });
    console.log("LocalFromPush : ", LocalFromPush);
    LocalReturnData.KTF = true;

    return await LocalReturnData;
};

// console.log("ForExistence----- : ", ReturnAsArrayWithPKSortByPK({
//     inFolderName: "Transactions",
//     inFileNameOnly: "GST-SALES",
//     inItemName: "FERTLIZERS-GST--SALES",
//     inDataPK: 1024
// }).JsonData[0]);

module.exports = { StartFunc };
