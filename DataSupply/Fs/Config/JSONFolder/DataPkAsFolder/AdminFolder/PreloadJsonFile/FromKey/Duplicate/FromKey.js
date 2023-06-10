let CommonFromJson = require("../../PullDataFromFile/FromJson");
let CommonPushDataToFile = require("../../PushDataToFile/ToJson");
let CommonCheckKey = require("../PullData/FromKeys");

let MockAllowFunc = require("../../../../../../../../MockAllow.json")

let StartFunc = ({ DataPK, fromKeyName, inNewKeyName }) => {
    let LocalinDataPK = DataPK;
    let LocalfromKeyName = fromKeyName;
    let LocalinNewKeyName = inNewKeyName;
    let LocalReturnData = {};

    let LocalFromCommonCheckKey = CommonCheckKey.StartFunc({
        DataPK: LocalinDataPK,
        KeyName: inNewKeyName
    });

    if (LocalFromCommonCheckKey.KTF) {
        LocalReturnData.KReason = `KeyName:${LocalinNewKeyName} found in .!`

        return LocalReturnData;
    };

    let LocalFromCommonFromJson = CommonFromJson.StartFunc({
        DataPK: LocalinDataPK
    });

    if ((LocalFromCommonFromJson.KTF === false)) {
        LocalReturnData.KReason = LocalFromCommonFromJson.KReason
        return LocalReturnData;
    };

    LocalReturnData = LocalFromCommonFromJson.JsonData;

    LocalReturnData[inNewKeyName] = LocalFromCommonFromJson.JsonData[LocalfromKeyName];

    let localupdata = CommonPushDataToFile.StartFunc({
        DataPK: LocalinDataPK,
        inOriginalData: LocalFromCommonFromJson.JsonData,
        inDataToUpdate: LocalReturnData
    });
    if (localupdata.KTF) {
        LocalReturnData.KTF = true;
    };

    return LocalReturnData;
};

if (MockAllowFunc.AllowMock) {
    if (MockAllowFunc.MockKey === "S9") {
        let result = StartFunc({
            DataPK: MockAllowFunc.DataPK,
            fromKeyName: "Masters-Accounts",
            inNewKeyName: "Masters-Accountsss"
        });
        console.log("result : ", result);
    };
};


module.exports = { StartFunc };
