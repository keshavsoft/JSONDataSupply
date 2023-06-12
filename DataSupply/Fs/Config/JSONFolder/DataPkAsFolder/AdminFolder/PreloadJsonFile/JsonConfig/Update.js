let CommonPullDataFromFile = require("../PullDataFromFile/FromJson");
let CommonPushDataToFile = require("../PushDataToFile/ToJson");

let MockAllowFunc = require("../../../../../../../MockAllow.json")

let StartFunc = ({ DataPK, KeyName, BodyAsJson }) => {
    const LocalDataToUpdate = (({ UserFolderName, inFolderName, inJsonFileName }) => ({ UserFolderName, inFolderName, inJsonFileName }))(BodyAsJson);

    let LocalinDataPK = DataPK;
    let LocalKeyName = KeyName;

    let LocalFromCommonFromCheck = CommonPullDataFromFile.StartFunc({
        DataPK: LocalinDataPK
    });

    let LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF === false) {
        return LocalReturnData;
    };

    if ((LocalKeyName in LocalReturnData.JsonData) === false) {
        LocalReturnData.KReason = `KeyName:${LocalKeyName} not found !`
        return LocalReturnData;
    };

    if (("JsonConfig" in LocalReturnData.JsonData[LocalKeyName]) === false) {
        LocalReturnData.KReason = `JsonConfig not found !`
        return LocalReturnData;
    };

    LocalReturnData.JsonData[LocalKeyName].JsonConfig.UserFolderName = LocalDataToUpdate.UserFolderName;
    LocalReturnData.JsonData[LocalKeyName].JsonConfig.inFolderName = LocalDataToUpdate.inFolderName;
    LocalReturnData.JsonData[LocalKeyName].JsonConfig.inJsonFileName = LocalDataToUpdate.inJsonFileName;

    let LocalFromUpdate = CommonPushDataToFile.StartFunc({
        DataPK: LocalinDataPK,
        inOriginalData: LocalFromCommonFromCheck.JsonData,
        inDataToUpdate: LocalReturnData.JsonData
    });
    if (LocalFromUpdate.KTF) {
        LocalReturnData.KTF = true;
    };


    return LocalReturnData;
};

if (MockAllowFunc.AllowMock) {
    if (MockAllowFunc.MockKey === "SV1") {
        let result = StartFunc({
            DataPK: MockAllowFunc.DataPK,
            KeyName: "Masters-Accounts",
            BodyAsJson: {
                UserFolderName: "SSS",
                inFolderName: "SRee",
                inJsonFileName: "skv.json"
            }
        });
        console.log("result : ", result);
    };
};


module.exports = { StartFunc };
