let CommonPullData = require("../../../../../../Files/PullData/FromConfig");
let CommonPushData = require("../../../../../../Files/PushData/ToConfig");

let FuncStart = async ({ inJsonConfig, inItemConfig, inObjectToUpdate, inDataPk }) => {
    let LocalkeyNeeded = "ParentClasses";
    let LocalKeyUpdate = "Table";
    const LocalDataToUpdate = (({ CardClass }) => ({ CardClass }))(inObjectToUpdate);
    let LocalFromUpdate;
    let LocalReturnData = { KTF: false, KReason: "" };

    let LocalItemName = inItemConfig.inItemName;
    let LocalScreenName = inItemConfig.inScreenName;
    let LocalSubTableColumnName = inItemConfig.inSubTableColumnName;

    let LocalDataPk = inDataPk;
    let LocalConfigData = await CommonPullData.AsJsonAsync({ inJsonConfig, inUserPK: LocalDataPk });
    let LocalUpdatedData = JSON.parse(JSON.stringify(LocalConfigData));

    if (LocalItemName in LocalUpdatedData) {
        if (LocalScreenName in LocalUpdatedData[LocalItemName]) {
            if ("SubTableColumns" in LocalUpdatedData[LocalItemName][LocalScreenName]) {
                if (LocalSubTableColumnName in LocalUpdatedData[LocalItemName][LocalScreenName].SubTableColumns) {
                    if ("TableInfo" in LocalUpdatedData[LocalItemName][LocalScreenName].SubTableColumns[LocalSubTableColumnName]) {
                        if (LocalkeyNeeded in LocalUpdatedData[LocalItemName][LocalScreenName].SubTableColumns[LocalSubTableColumnName].TableInfo) {
                            if (LocalKeyUpdate in LocalUpdatedData[LocalItemName][LocalScreenName].SubTableColumns[LocalSubTableColumnName].TableInfo[LocalkeyNeeded]) {
                                LocalUpdatedData[LocalItemName][LocalScreenName].SubTableColumns[LocalSubTableColumnName].TableInfo[LocalkeyNeeded][LocalKeyUpdate].CardClass = LocalDataToUpdate.CardClass;

                                LocalFromUpdate = await CommonPushData.AsAsync({
                                    inJsonConfig,
                                    inUserPK: LocalDataPk, inOriginalData: LocalConfigData,
                                    inDataToUpdate: LocalUpdatedData
                                });
                                return await LocalFromUpdate;
                            } else {
                                LocalReturnData.KReason = `${LocalKeyUpdate} - key not found in TableInfo.${LocalkeyNeeded}`;
                                return await LocalReturnData;
                            };
                        };
                    };
                };
            }
        };
    };
};

let FuncForUpdate = async ({ inJsonConfig, inItemConfig, inObjectToUpdate, inDataPk }) => {
    let LocalkeyNeeded = "ParentClasses";
    let LocalKeyUpdate = "Table";
    const LocalDataToUpdate = (({ CardClass }) => ({ CardClass }))(inObjectToUpdate);
    let LocalFromUpdate;
    let LocalReturnData = { KTF: false, KReason: "" };

    let LocalItemName = inItemConfig.inItemName;
    let LocalScreenName = inItemConfig.inScreenName;
    let LocalSubTableColumnName = inItemConfig.inSubTableColumnName;

    let LocalDataPk = inDataPk;
    let LocalConfigData = await CommonPullData.AsJsonAsync({ inJsonConfig, inUserPK: LocalDataPk });
    let LocalUpdatedData = JSON.parse(JSON.stringify(LocalConfigData));

    if (LocalItemName in LocalUpdatedData) {
        if (LocalScreenName in LocalUpdatedData[LocalItemName]) {
            if ("SubTableColumns" in LocalUpdatedData[LocalItemName][LocalScreenName]) {
                if (LocalSubTableColumnName in LocalUpdatedData[LocalItemName][LocalScreenName].SubTableColumns) {
                    console.log("InvGrid" in LocalUpdatedData[LocalItemName][LocalScreenName].SubTableColumns);
                    if ("TableInfo" in LocalUpdatedData[LocalItemName][LocalScreenName].SubTableColumns[LocalSubTableColumnName]) {
                        if (LocalkeyNeeded in LocalUpdatedData[LocalItemName][LocalScreenName].SubTableColumns[LocalSubTableColumnName].TableInfo) {
                            if (LocalKeyUpdate in LocalUpdatedData[LocalItemName][LocalScreenName].SubTableColumns[LocalSubTableColumnName].TableInfo[LocalkeyNeeded]) {
                                LocalUpdatedData[LocalItemName][LocalScreenName].SubTableColumns[LocalSubTableColumnName].TableInfo[LocalkeyNeeded][LocalKeyUpdate].CardClass = LocalDataToUpdate.CardClass;

                                // LocalFromUpdate = await CommonPushData.AsAsync({
                                //     inJsonConfig,
                                //     inUserPK: LocalDataPk, inOriginalData: LocalConfigData,
                                //     inDataToUpdate: LocalUpdatedData
                                // });

                                return await LocalFromUpdate;
                            } else {
                                LocalReturnData.KReason = `${LocalKeyUpdate} - key not found in TableInfo.${LocalkeyNeeded}`;
                                return await LocalReturnData;
                            };
                        };
                    };
                };
            }
        };
    };
};


module.exports = {
    FuncStart
};