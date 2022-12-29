let CommonFromPushData = require("../../../PushData/ToSubTable");

//let CommonFromServerSideChecks = require("../ServerSideChecks/CheckBeforeSave");
let CommonFromPullData = require("../../../PullData/FromFolderFileItemName");
let CommonFromConfigFolder = require("../../../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/TableColumns/PullData/AsArray");
let CommonObjectToSave = require("../../../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/SubTableColumns/SubTableKey/TableColumns/PullData/ObjectToSave");

let StartFunc = async ({ inFolderName, inFileNameOnly, inItemName, inScreenName, inDataPK, inDataToInsert, inSubTableKey, inMainRowPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;
    let LocalScreenName = inScreenName;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromPullData = CommonFromPullData.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalinItemName,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromPullData.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromPullData.KReason;
        return await LocalReturnData;
    };

    let LocalFromCommonFromConfigFolder = await CommonFromConfigFolder.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameWithExtension: `${LocalinFileNameOnly}.json`,
        inItemName: LocalinItemName,
        inScreenName: LocalScreenName,
        inDataPK: LocalinDataPK
    });
    // console.log("LocalFromCommonFromConfigFolder : ", LocalScreenName, LocalFromCommonFromConfigFolder);
    if (LocalFromCommonFromConfigFolder.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromConfigFolder.KReason;
        return await LocalReturnData;
    };

    let LocalObjectToSaveFromConfig = await CommonObjectToSave.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameWithExtension: `${LocalinFileNameOnly}.json`,
        inItemName: LocalinItemName,
        inScreenName: LocalScreenName,
        inSubTableColumnKey: inSubTableKey,
        inDataPK: LocalinDataPK
    });

    //console.log("LocalObjectToSaveFromConfig : ", LocalObjectToSaveFromConfig);
    if (LocalObjectToSaveFromConfig.KTF === false) {
        LocalReturnData.KReason = LocalObjectToSaveFromConfig.KReason;
        return await LocalReturnData;
    };

    let LocalObjectToSave = { ...LocalObjectToSaveFromConfig.JsonData, ...inDataToInsert };

   // console.log("LocalFromCommonFromConfigFolder : ", LocalObjectToSave, inSubTableKey);
    // let LocalFromCheck = await CommonFromServerSideChecks.ServerSideCheckAsync({
    //     inItemName: LocalinItemName,
    //     inUserData: LocalFromCommonFromPullData.JsonData,
    //     inConfigTableColumns: LocalFromCommonFromConfigFolder.JsonData,
    //     inDataPK: LocalinDataPK,
    //     inObjectToInsert: inDataToInsert
    // });

    // if (LocalFromCheck.KTF === false) {
    //     LocalReturnData.KReason = LocalFromCheck.KReason;
    //     return await LocalReturnData;
    // };

    let LocalFromCommonFromPushDataToFile = await CommonFromPushData.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalinItemName,
        inDataToInsert: LocalObjectToSave,
        inDataPK: LocalinDataPK,
        inMainRowPK,
        inSubTableKey
    })

    if (LocalFromCommonFromPushDataToFile.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromPushDataToFile.KReason;
        return await LocalReturnData;
    };

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
