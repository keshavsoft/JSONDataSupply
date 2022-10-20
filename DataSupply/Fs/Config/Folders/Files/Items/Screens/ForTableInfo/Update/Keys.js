let CommonPullData = require("../../../../PullData/FromConfig");
let CommonPushData = require("../../../../PushData/ToConfig");

let FuncStart = async ({ inJsonConfig, inItemConfig, inObjectToUpdate, inDataPk }) => {
    // console.log("hai", LocalQueryObject, callback);
    let LocalkeyNeeded = "TableInfo";
    const LocalDataToUpdate = (({ ColumnReOrder, ShowFooter, kPK }) => ({ ColumnReOrder, ShowFooter, kPK }))(inObjectToUpdate);
    let LocalFromUpdate;

    let LocalItemName = inItemConfig.inItemName;
    let LocalScreenName = inItemConfig.inScreenName;

    let LocalDataPk = inDataPk;
    let LocalConfigData = await CommonPullData.AsJsonAsync({ inJsonConfig, inUserPK: LocalDataPk });
    let LocalUpdatedData = JSON.parse(JSON.stringify(LocalConfigData));

    if (LocalItemName in LocalUpdatedData) {
        if (LocalScreenName in LocalUpdatedData[LocalItemName]) {
            if (LocalkeyNeeded in LocalUpdatedData[LocalItemName][LocalScreenName]) {
                LocalUpdatedData[LocalItemName][LocalScreenName][LocalkeyNeeded].ColumnReOrder = LocalDataToUpdate.ColumnReOrder;
                LocalUpdatedData[LocalItemName][LocalScreenName][LocalkeyNeeded].ShowFooter = LocalDataToUpdate.ShowFooter;
                LocalUpdatedData[LocalItemName][LocalScreenName][LocalkeyNeeded].kPK = LocalDataToUpdate.kPK;

                LocalFromUpdate = await CommonPushData.AsAsync({
                    inJsonConfig,
                    inUserPK: LocalDataPk, inOriginalData: LocalConfigData,
                    inDataToUpdate: LocalUpdatedData
                });

                return await LocalFromUpdate;
            };
        };
    };
};

module.exports = {
    FuncStart
};