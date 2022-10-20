let GlobalCommonPullData = require("../../Fs/Files/PullData");
let CommonPushData = require("../../Fs/Files/PushData");
let CommonReturnDataFuncs = require("../../ReturnDataFuncs");
let CommonToData = require("../../Fs/Config/Folders/Files/PushData/ToData");

exports.Delete = ({ inJsonConfig, inItemConfig, inPK, inUserPK }) => {
    return new Promise((resolve, reject) => {
        if (inUserPK > 0) {
            let LocalDisplayDataNeeded;
            let LocalItemName = inItemConfig.inItemName;

            let LocalDisplayData = GlobalCommonPullData.FromJson({ inJsonConfig, inUserPK });

            let LocalDataToBeInserted = JSON.parse(JSON.stringify(LocalDisplayData));

            LocalDisplayDataNeeded = LocalDataToBeInserted[LocalItemName];

            delete LocalDisplayDataNeeded[inPK.toString()];

            CommonPushData.PushData({ inJsonConfig, inUserPK: inUserPK, inOriginalData: LocalDisplayData, inDataToUpdate: LocalDataToBeInserted }).then((PromiseData) => {
                resolve(PromiseData);
            });
        };
    });
};

exports.DeleteAsync = async ({ inJsonConfig, inItemConfig, inUserPK, inRowPK }) => {
    if (inUserPK > 0) {
        let LocalReturnData;
        let LocalDataFromReturnFuncs;

        let LocalDisplayDataNeeded;
        let LocalItemName = inItemConfig.inItemName;

        let LocalDisplayData = GlobalCommonPullData.ReturnDataFromJson({ inJsonConfig, inUserPK });

        let LocalDataToBeInserted = JSON.parse(JSON.stringify(LocalDisplayData));

        LocalDisplayDataNeeded = LocalDataToBeInserted[LocalItemName];

        delete LocalDisplayDataNeeded[inRowPK.toString()];

        LocalReturnData = await CommonToData.AsAsync({
            inJsonConfig, inUserPK: inUserPK, inOriginalData: LocalDisplayData,
            inDataToUpdate: LocalDataToBeInserted
        });

        if (LocalReturnData.KTF) {
            LocalDataFromReturnFuncs = await CommonReturnDataFuncs.TableDelete({ inJsonConfig, inItemConfig, inPK: inRowPK, inUserPK })
            
            if (LocalDataFromReturnFuncs.KTF) {
                LocalReturnData.DataFromServer = LocalDataFromReturnFuncs.DataFromServer;
            } else {
                LocalReturnData.KReason = "ReturnData not defined";
            };
        };

        return LocalReturnData;
    };
};

exports.DeleteOnly = async ({ inJsonConfig, inItemConfig, inUserPK, inRowPK }) => {
    if (inUserPK > 0) {
        let LocalReturnData;
        let LocalDisplayDataNeeded;
        let LocalItemName = inItemConfig.inItemName;

        let LocalDisplayData = GlobalCommonPullData.ReturnDataFromJson({ inJsonConfig, inUserPK });

        let LocalDataToBeInserted = JSON.parse(JSON.stringify(LocalDisplayData));

        LocalDisplayDataNeeded = LocalDataToBeInserted[LocalItemName];

        delete LocalDisplayDataNeeded[inRowPK.toString()];

        LocalReturnData = await CommonPushData.PushDataAsync({ inJsonConfig, inUserPK: inUserPK, inOriginalData: LocalDisplayData, inDataToUpdate: LocalDataToBeInserted });

        return LocalReturnData;
    };
};

exports.DeleteSubTable = async ({ inJsonConfig, inItemConfig, inPK, inUserPK, InsertKey, inRowPK }) => {
    if (inUserPK > 0) {
        let LocalReturnData = { KTF: false, DataFromServer: [], KReason: "" };

        if (inRowPK.length === 0) {
            LocalReturnData.KReason = "RowPk is not supplied from UI";
        } else {
            let LocalReturnDataFromPushData;

            let LocalDataFromReturnFuncs;

            let LocalDisplayDataNeeded;
            let LocalItemName = inItemConfig.inItemName;

            let LocalDisplayData = GlobalCommonPullData.ReturnDataFromJson({ inJsonConfig, inUserPK });

            let LocalDataToBeInserted = JSON.parse(JSON.stringify(LocalDisplayData));

            LocalDisplayDataNeeded = LocalDataToBeInserted[LocalItemName][inPK.toString()][InsertKey];

            delete LocalDisplayDataNeeded[inRowPK.toString()];

            LocalReturnDataFromPushData = await CommonPushData.PushDataAsync({ inJsonConfig, inUserPK: inUserPK, inOriginalData: LocalDisplayData, inDataToUpdate: LocalDataToBeInserted });

            if (LocalReturnDataFromPushData.KTF) {
                LocalReturnData.KTF = true;
                LocalDataFromReturnFuncs = CommonReturnDataFuncs.SubTableDelete({ inJsonConfig, inItemConfig, inPK, inUserPK })

                if (LocalDataFromReturnFuncs.KTF) {
                    LocalReturnData.DataFromServer = LocalDataFromReturnFuncs.DataFromServer;
                } else {
                    LocalReturnData.KTF = LocalDataFromReturnFuncs.KTF;
                    LocalReturnData.KReason = LocalDataFromReturnFuncs.KReason;
                }
            };
        };

        return LocalReturnData;
    };
};