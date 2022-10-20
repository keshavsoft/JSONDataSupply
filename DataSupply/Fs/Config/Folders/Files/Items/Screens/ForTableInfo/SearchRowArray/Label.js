let CommonPullData = require("../../../../PullData/FromConfig");
let CommonPushData = require("../../../../PushData/ToConfig");

let FuncStart = async ({ inDataPk, inJsonConfig, inItemConfig, inObjectToUpdate }) => {
    // console.log("hai-------:", );
    let LocalkeyNeeded = "SearchRowArray";
    let LocalKeyUpdate = "Label";
    const LocalDataToUpdate = (({ KTF, DisplayText, ColClass }) => ({ KTF, DisplayText, ColClass }))(inObjectToUpdate);
    let LocalFromUpdate;

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
                        LocalUpdatedData[LocalItemName][LocalScreenName].TableInfo[LocalkeyNeeded][LocalKeyUpdate].KTF = LocalDataToUpdate.KTF;
                        if ("DisplayObject" in LocalUpdatedData[LocalItemName][LocalScreenName].TableInfo[LocalkeyNeeded][LocalKeyUpdate]) {
                            LocalUpdatedData[LocalItemName][LocalScreenName].TableInfo[LocalkeyNeeded][LocalKeyUpdate].DisplayObject.DisplayText = LocalDataToUpdate.DisplayText;
                            LocalUpdatedData[LocalItemName][LocalScreenName].TableInfo[LocalkeyNeeded][LocalKeyUpdate].DisplayObject.ColClass = LocalDataToUpdate.ColClass;

                            LocalFromUpdate = await CommonPushData.AsAsync({
                                inJsonConfig,
                                inUserPK: LocalDataPk, inOriginalData: LocalConfigData,
                                inDataToUpdate: LocalUpdatedData
                            });

                            return await LocalFromUpdate;
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