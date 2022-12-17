let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../../PullData/AsJson");


// let CommonPushDataToConfig = require("../../../../PushData/ToConfig");
// let CommonUpdateFuncs = require("../../CommonFuns/CommonUpdate");


let UpdateKeys = async ({ DataPK, folderName, FileName, ItemName, ScreenName, DataAttribute, BodyAsJson }) => {
    console.log("kkkkkkkk", DataPK, folderName, FileName, ItemName, ScreenName, DataAttribute, BodyAsJson);
    const LocalDataToUpdate = (({ DisplayName, ShowInTable, Insert, CreateNew, IsTextArea }) => ({ DisplayName, ShowInTable, Insert, CreateNew, IsTextArea }))(BodyAsJson);
    let LocalinDataPK = DataPK;

    let inJsonConfig = { inFolderName: folderName, inJsonFileName: FileName }
    let LocalItemName = ItemName;
    let LocalScreenName = ScreenName;
    let LocalFindColumnObject;
    let LocalFromUpdate;
    let LocalReturnObject = { KTF: false };

    let LocalFromPullData = await CommonPullDataFromConfig.FromJsonConfig({
        inJsonConfig,
        inDataPK: LocalinDataPK
    });


    if (LocalItemName in LocalFromPullData.JsonData) {
        if (LocalScreenName in LocalFromPullData.JsonData[LocalItemName]) {
            if ("TableColumns" in LocalFromPullData.JsonData[LocalItemName][LocalScreenName]) {
                //console.log("LocalFromPullData : ", LocalFromPullData.JsonData[LocalItemName][LocalScreenName].TableColumns);

                LocalFindColumnObject = _.find(LocalFromPullData.JsonData[LocalItemName][LocalScreenName].TableColumns, { DataAttribute });

                console.log("LocalFromPullData : ", LocalFindColumnObject.DisplayName, LocalDataToUpdate.DisplayName);

                LocalFindColumnObject.DisplayName = LocalDataToUpdate.DisplayName;


                // CommonUpdateFuncs.UpdateKeysNeededOnly({
                //     inFindColumnObject: LocalFindColumnObject,
                //     inDataToUpdate: LocalDataToUpdate
                // });

                // LocalFromUpdate = await CommonPushDataToConfig.AsAsync({
                //     inJsonConfig,
                //     inUserPK: LocalinDataPK,
                //     inDataToUpdate: LocalFromPullData
                // });

                // if (LocalFromUpdate.KTF) {
                //     LocalReturnObject.KTF = true;
                // };

                return await LocalReturnObject;
            };
        };
    };

    return await LocalReturnObject;

};
let UpdateKeysDec17 = async ({ inJsonConfig, inItemConfig, inTableColumnName, inObjectToUpdate, inDataPK }) => {
    const LocalDataToUpdate = (({ DisplayName, ShowInTable, Insert, CreateNew, IsTextArea }) => ({ DisplayName, ShowInTable, Insert, CreateNew, IsTextArea }))(inObjectToUpdate);
    let LocalinDataPK = inDataPK;

    let LocalItemName = inItemConfig.inItemName;
    let LocalScreenName = inItemConfig.inScreenName;
    let LocalFindColumnObject;
    let LocalFromUpdate;
    let LocalReturnObject = { KTF: false };

    let LocalFromPullData = await CommonPullDataFromConfig.FromJsonConfig({
        inJsonConfig,
        inDataPK: LocalinDataPK
    });

    console.log("LocalFromPullData : ", LocalFromPullData);

    if (LocalItemName in LocalFromPullData.JsonData) {
        if (LocalScreenName in LocalFromPullData.JsonData[LocalItemName]) {
            if ("TableColumns" in LocalFromPullData.JsonData[LocalItemName][LocalScreenName]) {
                console.log("aaaaaaaaaaa : ", LocalFromPullData.JsonData[LocalItemName][LocalScreenName].TableColumns);
                LocalFindColumnObject = _.find(LocalFromPullData.JsonData[LocalItemName][LocalScreenName].TableColumns, { DataAttribute: inTableColumnName });

                // CommonUpdateFuncs.UpdateKeysNeededOnly({
                //     inFindColumnObject: LocalFindColumnObject,
                //     inDataToUpdate: LocalDataToUpdate
                // });

                // LocalFromUpdate = await CommonPushDataToConfig.AsAsync({
                //     inJsonConfig,
                //     inUserPK: LocalinDataPK,
                //     inDataToUpdate: LocalFromPullData
                // });

                // if (LocalFromUpdate.KTF) {
                //     LocalReturnObject.KTF = true;
                // };

                return await LocalReturnObject;
            };
        };
    };

    return await LocalReturnObject;

};


// UpdateKeys({
//     inJsonConfig: {
//         inFolderName: "Masters",
//         inJsonFileName: "Customers.json"
//     },
//     inItemConfig: {
//         inItemName: "CustomerNames",
//         inScreenName: "Create"
//     },
//     inObjectToUpdate: {},
//     inDataPK: 16
// }).then(p => {
//     console.log("pppp : ", p);
// });


module.exports = {
    UpdateKeys
};