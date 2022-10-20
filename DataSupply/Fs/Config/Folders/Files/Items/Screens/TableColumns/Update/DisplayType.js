let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../../PullData/FromConfig");
let CommonPushDataToConfig = require("../../../../PushData/ToConfig");

let UpdateKeys = async ({ inJsonConfig, inItemConfig, inTableColumnName, inObjectToUpdate, inDataPk }) => {
    const LocalDataToUpdate = (({ IsIndianFormat, IsInput }) => ({ IsIndianFormat, IsInput }))(inObjectToUpdate);

    let LocalItemName = inItemConfig.inItemName;
    let LocalScreenName = inItemConfig.inScreenName;
    let LocalFindColumnObject;
    let LocalFromUpdate;
    let LocalReturnObject = { KTF: false, KReason: "" };

    let LocalFromPullData = await CommonPullDataFromConfig.AsJsonAsync({
        inJsonConfig,
        inUserPK: inDataPk
    });

    if (LocalItemName in LocalFromPullData) {
        if (LocalScreenName in LocalFromPullData[LocalItemName]) {
            if ("TableColumns" in LocalFromPullData[LocalItemName][LocalScreenName]) {
                LocalFindColumnObject = _.find(LocalFromPullData[LocalItemName][LocalScreenName].TableColumns, { DataAttribute: inTableColumnName });

                console.log("LocalFindColumnObject:",LocalFindColumnObject);

                LocalFindColumnObject.DisplayType.IsIndianFormat = LocalDataToUpdate.IsIndianFormat;
                LocalFindColumnObject.DisplayType.IsInput = LocalDataToUpdate.IsInput;

                LocalFromUpdate = await CommonPushDataToConfig.AsAsync({
                    inJsonConfig,
                    inUserPK: inDataPk,
                    inDataToUpdate: LocalFromPullData
                });

                if (LocalFromUpdate.KTF) {
                    LocalReturnObject.KTF = true;
                };

                return await LocalReturnObject;
            } else {
                LocalReturnObject.KReason = `TableColumns not found in ${LocalItemName} and ${LocalScreenName}`;
            };
        } else {
            LocalReturnObject.KReason = `ScreenName - ${LocalScreenName} not found!`;
        };
    } else {
        LocalReturnObject.KReason = `ItemName - ${LocalItemName} not found!`;
    };

    return await LocalReturnObject;
};

module.exports = {
    UpdateKeys
};