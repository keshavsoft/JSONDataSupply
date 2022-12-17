let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../../../PullData/AsJson");

// let CommonPushDataToConfig = require("../../../../PushData/ToConfig");
// let CommonUpdateFuncs = require("../../CommonFuns/CommonUpdate");

let UpdateKeys = async ({ inJsonConfig, inItemConfig, inTableColumnName, inObjectToUpdate, inDataPK }) => {
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

    if (LocalItemName in LocalFromPullData) {
        if (LocalScreenName in LocalFromPullData[LocalItemName]) {
            if ("TableColumns" in LocalFromPullData[LocalItemName][LocalScreenName]) {
                console.log("aaaaaaaaaaa : ", LocalFromPullData[LocalItemName][LocalScreenName].TableColumns);
                LocalFindColumnObject = _.find(LocalFromPullData[LocalItemName][LocalScreenName].TableColumns, { DataAttribute: inTableColumnName });

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
//         inItemName: "CustomersName",
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