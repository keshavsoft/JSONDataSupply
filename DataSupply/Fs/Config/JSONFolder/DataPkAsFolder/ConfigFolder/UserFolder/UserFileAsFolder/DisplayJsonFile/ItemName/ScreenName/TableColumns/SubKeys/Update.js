let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../../PullData/AsJson");
let CommonFromPushData = require("../../../../PushData/FromFoldFile");

// let CommonPushDataToConfig = require("../../../../PushData/ToConfig");
// let CommonUpdateFuncs = require("../../CommonFuns/CommonUpdate");



let UpdateKeys = async ({ DataPK, folderName, FileName, ItemName, ScreenName, DataAttribute, BodyAsJson }) => {
    //    console.log("kkkkkkkk", DataPK, folderName, FileName, ItemName, ScreenName, DataAttribute, BodyAsJson);
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

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromPullData.JsonData));

    if (LocalItemName in LocalNewData) {
        if (LocalScreenName in LocalNewData[LocalItemName]) {
            if ("TableColumns" in LocalNewData[LocalItemName][LocalScreenName]) {
                LocalFindColumnObject = _.find(LocalNewData[LocalItemName][LocalScreenName].TableColumns, { DataAttribute });

                LocalFindColumnObject.DisplayName = LocalDataToUpdate.DisplayName;

                LocalFromUpdate = await CommonFromPushData.StartFunc({
                    inFolderName: folderName,
                    inFileNameWithExtension: FileName,
                    inDataPK: LocalinDataPK,
                    inDataToUpdate: LocalNewData,
                    inOriginalData: LocalFromPullData.JsonData
                });

                //console.log("LocalFromUpdate : ", LocalFromUpdate);

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
//     DataPK: 16, folderName: "Masters", FileName: "Customers.json", ItemName: "CustomersName", ScreenName: "Create",
//     DataAttribute: "pk",
//     BodyAsJson: {
//         DisplayName: "ppppppppppp"
//     }
// }).then(p => {
//     console.log("pppp : ", p);
// });


module.exports = {
    UpdateKeys
};