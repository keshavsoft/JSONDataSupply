let CommonCheckColumn = require("./CheckColumn");
let CommonPullDataFromFile = require("../PullDataFromFile/FromJson");
let CommonPushDataToFile = require("../PushDataToFile/ToJson");

let MockAllowFunc = require("../../../../../../../MockAllow.json")

let StartFunc = ({ DataPK, KeyName, inArrayAsString }) => {

    let LocalinDataPK = DataPK;
    let LocalKeyName = KeyName;
    let localinArrayAsString = inArrayAsString.Columns;
    let LocalArraytoInsert = localinArrayAsString.split(",");

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
    LocalReturnData.JsonData[LocalKeyName].Columns = LocalArraytoInsert;

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

let StartFunc_keshav_15Jun2023 = ({ DataPK, KeyName, BodyAsJson }) => {
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
    if (MockAllowFunc.MockKey === "SV1") {
        let LockMockData = require("./Update.json");

        let result = StartFunc({
            DataPK: MockAllowFunc.DataPK,
            ...LockMockData
        });

        console.log("result : ", result.JsonData['Masters-Items'].Columns);
        console.log("22222 : ", result.JsonData['Masters-Items'].Columns.toString());

    };
};

module.exports = { StartFunc };
