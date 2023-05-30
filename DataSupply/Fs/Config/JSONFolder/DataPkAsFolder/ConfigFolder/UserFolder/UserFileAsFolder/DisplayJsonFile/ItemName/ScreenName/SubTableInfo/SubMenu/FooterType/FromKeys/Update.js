let CommonPullDataFromConfig = require("../../../../../../PullData/AsJson");
let CommonFromPushData = require("../../../../../../PushData/FromFoldFile");
let CommonCheckInputs = require("../../../CommonFuncs/CheckInputs");

let Update = async ({ inDataPK, inFolderName, inFileName, inItemName, inScreenName, GridName, BodyAsJson }) => {
    const LocalDataToUpdate = (({ CreateNew, ShowBalance, ShowTotals }) => ({ CreateNew, ShowBalance, ShowTotals }))(BodyAsJson);

    let LocalinDataPK = inDataPK;
    let localFolderName = inFolderName;
    let localinFileName = inFileName;
    let LocalItemName = inItemName;
    let LocalScreenName = inScreenName;
    let localGridName = GridName;

    let LocalFromUpdate;
    let LocalReturnObject = { KTF: false };

    let LocalFromPullData = await CommonPullDataFromConfig.FromFoldFile({
        inFolderName: localFolderName,
        inFileNameWithExtension: `${localinFileName}.json`,
        inDataPK: LocalinDataPK
    });

    if (LocalFromPullData.KTF === false) {
        LocalReturnObject.KReason = LocalFromPullData.KReason;
        return await LocalReturnObject;
    };

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromPullData.JsonData));

    let LocalFromCommonCheckInputs = await CommonCheckInputs.StartFunc({
        inItemName, inScreenName, GridName,
        inConfigData: LocalFromPullData.JsonData
    });

    if (LocalFromCommonCheckInputs.KTF === false) {
        LocalReturnObject.KReason = LocalFromCommonCheckInputs.KReason;
        return await LocalReturnObject;
    };

    LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[localGridName].TableInfo.FooterType.CreateNew = LocalDataToUpdate.CreateNew;
    LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[localGridName].TableInfo.FooterType.ShowBalance = LocalDataToUpdate.ShowBalance;
    LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[localGridName].TableInfo.FooterType.ShowTotals = LocalDataToUpdate.ShowTotals;

    LocalFromUpdate = await CommonFromPushData.StartFunc({
        inFolderName: localFolderName,
        inFileNameWithExtension: `${localinFileName}.json`,
        inDataPK: LocalinDataPK,
        inDataToUpdate: LocalNewData,
        inOriginalData: LocalFromPullData.JsonData
    });

    if (LocalFromUpdate.KTF) {
        LocalReturnObject.KTF = true;
    };


    return await LocalReturnObject;
};

let Update_30May2023 = async ({ inDataPK, inFolderName, inFileName, inItemName, inScreenName, GridName, BodyAsJson }) => {
    const LocalDataToUpdate = (({ CreateNew, ShowBalance, ShowTotals }) => ({ CreateNew, ShowBalance, ShowTotals }))(BodyAsJson);

    let LocalinDataPK = inDataPK;
    let localFolderName = inFolderName;
    let localinFileName = inFileName;
    let LocalItemName = inItemName;
    let LocalScreenName = inScreenName;
    let localGridName = GridName;

    let LocalFromUpdate;
    let LocalReturnObject = { KTF: false };

    let LocalFromPullData = await CommonPullDataFromConfig.FromFoldFile({
        inFolderName: localFolderName,
        inFileNameWithExtension: `${localinFileName}.json`,
        inDataPK: LocalinDataPK
    });

    if (LocalFromPullData.KTF === false) {
        LocalReturnObject.KReason = LocalFromPullData.KReason;
        return await LocalReturnObject;
    };

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromPullData.JsonData));

    if (LocalItemName in LocalNewData === false) {
        LocalReturnObject.KReason = LocalFromPullData.KReason;
        return await LocalReturnObject;
    };

    if (LocalItemName in LocalNewData === false) {
        LocalReturnObject.KReason = `ItemName: ${LocalItemName} Not found.!`;
        return await LocalReturnObject;
    };

    if (LocalScreenName in LocalNewData[LocalItemName] === false) {
        LocalReturnObject.KReason = `Screen: ${LocalScreenName} Not found.!`;
        return await LocalReturnObject;
    };

    if ("SubTableColumns" in LocalNewData[LocalItemName][LocalScreenName] === false) {
        LocalReturnObject.KReason = `SubTableColumns Not found.!`;
        return await LocalReturnObject;
    };

    if (localGridName in LocalNewData[LocalItemName][LocalScreenName].SubTableColumns === false) {
        LocalReturnObject.KReason = `Grid: ${localGridName} Not found.!`;
        return await LocalReturnObject;
    };

    if ("TableInfo" in LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[localGridName] === false) {
        LocalReturnObject.KReason = `TableInfo Not found.!`;
        return await LocalReturnObject;
    };

    if ("FooterType" in LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[localGridName].TableInfo === false) {
        LocalReturnObject.KReason = `FooterType Not found.!`;
        return await LocalReturnObject;
    };


    LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[localGridName].TableInfo.CreateNew = LocalDataToUpdate.CreateNew;
    LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[localGridName].TableInfo.ShowBalance = LocalDataToUpdate.ShowBalance;
    LocalNewData[LocalItemName][LocalScreenName].SubTableColumns[localGridName].TableInfo.ShowTotals = LocalDataToUpdate.ShowTotals;

    LocalFromUpdate = await CommonFromPushData.StartFunc({
        inFolderName: localFolderName,
        inFileNameWithExtension: `${localinFileName}.json`,
        inDataPK: LocalinDataPK,
        inDataToUpdate: LocalNewData,
        inOriginalData: LocalFromPullData.JsonData
    });
    console.log("LocalFromUpdate:", LocalFromUpdate);

    if (LocalFromUpdate.KTF) {
        LocalReturnObject.KTF = true;
    };


    return await LocalReturnObject;
};


// UpdateKeys({
//     DataPK: 16, folderName: "Masters", FileName: "Customers.json", ItemName: "CustomersName", ScreenName: "Create",
//     DataAttribute: "pk",
//     BodyAsJson: {
//         DisplayName: "ppppppppppp"
//     }
// }).then(p => {
//     console.log("pppp : ", p);
// });


module.exports = {
    Update
};