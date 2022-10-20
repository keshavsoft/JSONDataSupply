let _ = require("lodash");

let CommonPullDataFromConfig = require("../../../../PullData/FromConfig");
let CommonPushDataToConfig = require("../../../../PushData/ToConfig");

let UpdateKeys = async ({ inJsonConfig, inItemConfig, inTableColumnName, inObjectToUpdate, inDataPk }) => {
    console.log("inObjectToUpdate:", inObjectToUpdate);
    const LocalDataToUpdate = (({ inTable }) => ({ inTable }))(inObjectToUpdate);

    let LocalItemName = inItemConfig.inItemName;
    let LocalScreenName = inItemConfig.inScreenName;
    let LocalFindColumnObject;
    let LocalFromUpdate;
    console.log("LocalFromUpdate:", LocalFromUpdate);
    let LocalReturnObject = { KTF: false };

    let LocalFromPullData = await CommonPullDataFromConfig.AsJsonAsync({
        inJsonConfig,
        inUserPK: inDataPk
    });

    if (LocalItemName in LocalFromPullData) {
        if (LocalScreenName in LocalFromPullData[LocalItemName]) {

            if ("TableColumns" in LocalFromPullData[LocalItemName][LocalScreenName]) {

                LocalFindColumnObject = _.find(LocalFromPullData[LocalItemName][LocalScreenName].TableColumns, { DataAttribute: inTableColumnName });
                // console.log("kkkkk:", LocalItemName, LocalScreenName, LocalFindColumnObject.DiplayOrder.inTable, LocalDataToUpdate.inTable);
                LocalFindColumnObject.DisplayOrder.inTable = parseInt(LocalDataToUpdate.inTable);
                // console.log("staart-inTable:", LocalFindColumnObject.DisplayOrder.inTable);
                // LocalFindColumnObject.DisplayOrder.inTable = parseInt(LocalDataToUpdate.inTable);
                // console.log("end-inTable:", LocalFindColumnObject.DisplayOrder.inTable);


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

module.exports = {
    UpdateKeys
};