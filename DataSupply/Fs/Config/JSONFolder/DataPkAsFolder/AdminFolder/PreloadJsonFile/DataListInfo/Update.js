let CommonCheck = require("./CheckDataListInfo");
let CommonPullDataFromFile = require("../PullDataFromFile/FromJson");
let CommonPushDataToFile = require("../PushDataToFile/ToJson");

let MockAllowFunc = require("../../../../../../../MockAllow.json")

let StartFunc = ({ DataPK, KeyName, BodyAsJson }) => {
    const LocalDataToUpdate = (({ DatalistID }) => ({ DatalistID }))(BodyAsJson);

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

    let localCommonCheckConfig = CommonCheck.StartFunc({ DataPK: LocalinDataPK, KeyName: LocalKeyName });

    if ((localCommonCheckConfig.KTF) === false) {
        LocalReturnData.KReason = localCommonCheckConfig.KReason;
        return LocalReturnData;
    };

    LocalReturnData.JsonData[LocalKeyName].DataListInfo.DatalistID = LocalDataToUpdate.DatalistID;

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
    if (MockAllowFunc.MockKey === "SV5") {
        let result = StartFunc({
            DataPK: MockAllowFunc.DataPK,
            KeyName: "Masters-Accounts",
            BodyAsJson: {
                DatalistID: "SSS"
            }
        });
        console.log("result : ", result);
    };
};


module.exports = { StartFunc };
