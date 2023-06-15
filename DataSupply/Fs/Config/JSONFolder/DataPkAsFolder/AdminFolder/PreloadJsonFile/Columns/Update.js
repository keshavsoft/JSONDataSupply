let CommonCheckColumn = require("./CheckColumn");
let CommonPullDataFromFile = require("../PullDataFromFile/FromJson");
let CommonPushDataToFile = require("../PushDataToFile/ToJson");

let MockAllowFunc = require("../../../../../../../MockAllow.json")

let StartFunc = ({ DataPK, KeyName, BodyAsJson }) => {
    // const LocalDataToUpdate = (({ AccountName, pk }) => ({ AccountName, pk }))(BodyAsJson);

    let LocalinDataPK = DataPK;
    let LocalKeyName = KeyName;
    let localBodyAsJson = BodyAsJson;
    const propertyNames = Object.values(localBodyAsJson);


    let LocalFromCommonFromCheck = CommonPullDataFromFile.StartFunc({
        DataPK: LocalinDataPK
    });

    let LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF === false) {
        return LocalReturnData;
    };

    let localCommonCheckConfig = CommonCheckColumn.StartFunc({ DataPK: LocalinDataPK, KeyName: LocalKeyName });

    if ((localCommonCheckConfig.KTF) === false) {
        LocalReturnData.KReason = localCommonCheckConfig.KReason;
        return LocalReturnData;
    };

    // LocalReturnData.JsonData[LocalKeyName].Columns.push(localBodyAsJson);
    LocalReturnData.JsonData[LocalKeyName].Columns = propertyNames;

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
    if (MockAllowFunc.MockKey === "SV3") {
        let result = StartFunc({
            DataPK: MockAllowFunc.DataPK,
            KeyName: "Masters-Accounts",
            BodyAsJson: {
                AccountName: "SSS",
                pk: "SRee"
            }
        });
        console.log("result : ", result);
    };
};


module.exports = { StartFunc };
