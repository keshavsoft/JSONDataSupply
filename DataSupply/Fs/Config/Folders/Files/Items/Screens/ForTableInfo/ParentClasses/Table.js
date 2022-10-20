let CommonPullData = require("../../../../PullData/FromConfig");
let CommonPushData = require("../../../../PushData/ToConfig");

let FuncStart = async ({ inJsonConfig, inItemConfig, inObjectToUpdate, inDataPk }) => {
    // console.log("hai-------:", );
    let LocalkeyNeeded = "ParentClasses";
    let LocalKeyUpdate = "Table";
    const LocalDataToUpdate = (({ CardClass }) => ({ CardClass }))(inObjectToUpdate);
    let LocalFromUpdate;
    let LocalReturnData = { KTF: false, KReason: "" };

    let LocalItemName = inItemConfig.inItemName;
    let LocalScreenName = inItemConfig.inScreenName;

    let LocalDataPk = inDataPk;
    let LocalConfigData = await CommonPullData.AsJsonAsync({ inJsonConfig, inUserPK: LocalDataPk });
    let LocalUpdatedData = JSON.parse(JSON.stringify(LocalConfigData));

    if (LocalItemName in LocalUpdatedData) {
        if (LocalScreenName in LocalUpdatedData[LocalItemName]) {
            if ("TableInfo" in LocalUpdatedData[LocalItemName][LocalScreenName]) {
                if (LocalkeyNeeded in LocalUpdatedData[LocalItemName][LocalScreenName].TableInfo) {
                    if (LocalKeyUpdate in LocalUpdatedData[LocalItemName][LocalScreenName].TableInfo[LocalkeyNeeded]) {
                        LocalUpdatedData[LocalItemName][LocalScreenName].TableInfo[LocalkeyNeeded][LocalKeyUpdate].CardClass = LocalDataToUpdate.CardClass;

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
            }
        };
    };
};

module.exports = {
    FuncStart
};