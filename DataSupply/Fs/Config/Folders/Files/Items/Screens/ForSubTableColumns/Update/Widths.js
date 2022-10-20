let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../../PullData/FromConfig");
let CommonPushDataToConfig = require("../../../../PushData/ToConfig");

let UpdateKeys = async ({ inJsonConfig, inItemConfig, inTableColumnName, inObjectToUpdate, inQueryObject, inDataPk, callback }) => {
    const LocalDataToUpdate = (({ px }) => ({ px }))(inObjectToUpdate);

    // const LocalDataToUpdate = (({ DataAttribute, DisplayName, ShowInTable, Insert, CreateNew, IsTextArea }) => ({ DataAttribute, DisplayName, ShowInTable, Insert, CreateNew, IsTextArea }))(inObjectToUpdate);


    // let LocalItemName = inItemConfig.inItemName;
    // let LocalScreenName = inItemConfig.inScreenName;

    let LocalItemName = inItemConfig.inItemName;
    let LocalScreenName = inItemConfig.inScreenName;
    let LocalColumnName = inItemConfig.inColumnName;
    let LocalSubTableColumnName = inItemConfig.inSubTableColumnName;

    console.log("LocalSubTableColumnName------------------------- : ", LocalSubTableColumnName);

    let LocalFindColumnObject;
    let LocalFromUpdate;
    let LocalReturnObject = { KTF: false };

    let LocalFromPullData = await CommonPullDataFromConfig.AsJsonAsync({
        inJsonConfig,
        inUserPK: inDataPk
    });

    if (LocalItemName in LocalFromPullData) {
        if (LocalScreenName in LocalFromPullData[LocalItemName]) {
            if ("SubTableColumns" in LocalFromPullData[LocalItemName][LocalScreenName]) {
                LocalFindColumnObject = _.find(LocalFromPullData[LocalItemName][LocalScreenName].SubTableColumns[LocalColumnName].TableColumns, { DataAttribute: LocalSubTableColumnName });

                LocalFindColumnObject.Widths.px = LocalDataToUpdate.px;

                LocalFromUpdate = await CommonPushDataToConfig.AsAsync({
                    inJsonConfig,
                    inUserPK: inDataPk,
                    inDataToUpdate: LocalFromPullData
                });

                if (LocalFromUpdate.KTF) {
                    LocalReturnObject.KTF = true;
                };

                return await LocalReturnObject;
            };
        };
    };

    return await LocalReturnObject;
};

let LocalUpdateKeys = async ({ inFindColumnObject, inDataToUpdate }) => {
    const LocalDataToUpdate = inDataToUpdate;

    let LocalFindColumnObject = inFindColumnObject;

    if ("DataAttribute" in inFindColumnObject) {
        LocalFindColumnObject["DataAttribute"] = LocalDataToUpdate.DataAttribute;
    };
    if ("DisplayName" in LocalFindColumnObject) {
        LocalFindColumnObject["DisplayName"] = LocalDataToUpdate.DisplayName;
    };

    if ("ShowInTable" in LocalFindColumnObject) {
        LocalFindColumnObject["ShowInTable"] = LocalDataToUpdate.ShowInTable;
    };

    if ("Insert" in LocalFindColumnObject) {
        LocalFindColumnObject["Insert"] = LocalDataToUpdate.Insert;
    };

    if ("CreateNew" in LocalFindColumnObject) {
        LocalFindColumnObject["CreateNew"] = LocalDataToUpdate.CreateNew;
    };

    if ("IsTextArea" in LocalFindColumnObject) {
        LocalFindColumnObject["IsTextArea"] = LocalDataToUpdate.IsTextArea;
    };
};

module.exports = {
    UpdateKeys
};