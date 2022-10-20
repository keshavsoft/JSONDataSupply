let _ = require("lodash");

//let CommonPullData = require("../../Config/FromDisplayJson/PullData");
let CommonPullDataFromConfig = require("../../../../PullData/FromConfig");
let CommonPushDataToConfig = require("../../../../PushData/ToConfig");
let CommonUpdateFuncs=require("../../CommonFuns/CommonUpdate");

let UpdateKeys = async ({ inJsonConfig, inItemConfig, inTableColumnName, inObjectToUpdate, inQueryObject, inDataPk, callback }) => {
    // const LocalDataToUpdate = (({ DataAttribute, DisplayName, ShowInTable, Insert, CreateNew }) => ({ DataAttribute, DisplayName, ShowInTable, Insert, CreateNew }))(inObjectToUpdate);
    const LocalDataToUpdate = (({ DefaultValue, TextAlign }) => ({ DefaultValue, TextAlign }))(inObjectToUpdate);

    let LocalItemName = inItemConfig.inItemName;
    let LocalScreenName = inItemConfig.inScreenName;
    let LocalFindColumnObject;
    let LocalFromUpdate;
    let LocalReturnObject = { KTF: false };

    let LocalFromPullData = await CommonPullDataFromConfig.AsJsonAsync({
        inJsonConfig,
        inUserPK: inDataPk
    });

    if (LocalItemName in LocalFromPullData) {
        if (LocalScreenName in LocalFromPullData[LocalItemName]) {
            if ("TableColumns" in LocalFromPullData[LocalItemName][LocalScreenName]) {
                LocalFindColumnObject = _.find(LocalFromPullData[LocalItemName][LocalScreenName].TableColumns, { DataAttribute: inTableColumnName });

                // if ("DefaultValue" in LocalFindColumnObject) {
                //     LocalFindColumnObject["DefaultValue"] = LocalDataToUpdate.DefaultValue;
                // };

                CommonUpdateFuncs.UpdateKeysNeededOnly({inFindColumnObject:LocalFindColumnObject,
                inDataToUpdate:LocalDataToUpdate});

                LocalFromUpdate = await CommonPushDataToConfig.AsAsync({
                    inJsonConfig,
                    inUserPK: inDataPk,
                    inDataToUpdate: LocalFromPullData
                });

                if (LocalFromUpdate.KTF) {
                    LocalReturnObject.KTF = true;
                }
                console.log("LocalFromUpdate : ", LocalFromUpdate);

            };
        };
    };

    return await LocalReturnObject;

};

module.exports = {
    UpdateKeys
};