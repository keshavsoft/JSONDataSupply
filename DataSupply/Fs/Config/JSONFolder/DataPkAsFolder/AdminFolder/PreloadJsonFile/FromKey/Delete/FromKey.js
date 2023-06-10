let CommonFromJson = require("../../PullDataFromFile/FromJson");
let CommonPushDataToFile = require("../../PushDataToFile/ToJson");
let CommonCheckKey = require("../PullData/FromKeys");

let MockAllowFunc = require("../../../../../../../../MockAllow.json")

let StartFunc = ({ DataPK, inDeleteKeyName }) => {
    let LocalinDataPK = DataPK;
    let LocalinDeleteKeyName = inDeleteKeyName;
    let LocalReturnData = {};

    let LocalFromCommonCheckKey = CommonCheckKey.StartFunc({
        DataPK: LocalinDataPK,
        KeyName: LocalinDeleteKeyName
    });

    if ((LocalFromCommonCheckKey.KTF) === false) {
        LocalReturnData.KReason = `KeyName:${LocalinDeleteKeyName} not found in .!`

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

    delete LocalReturnData[LocalinDeleteKeyName]

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
    if (MockAllowFunc.MockKey === "S10") {
        let result = StartFunc({
            DataPK: MockAllowFunc.DataPK,
            inDeleteKeyName: "Masters-Accountss"
        });
        console.log("result : ", result);
    };
};


module.exports = { StartFunc };
