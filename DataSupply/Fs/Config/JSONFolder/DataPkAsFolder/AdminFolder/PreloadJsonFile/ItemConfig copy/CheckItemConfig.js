let CommonFromJson = require("../PullDataFromFile/FromJson");

let MockAllowFunc = require("../../../../../../../MockAllow.json")

let StartFunc = ({ DataPK, KeyName }) => {
    let LocalinDataPK = DataPK;
    let LocalKeyName = KeyName;

    let LocalFromCommonFromCheck = CommonFromJson.StartFunc({
        DataPK: LocalinDataPK
    });

    let LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF === false) {
        return LocalReturnData;
    };

    if ((LocalKeyName in LocalReturnData.JsonData) === false) {
        LocalReturnData.KReason = `KeyName:${KeyName} not found.!`
        return LocalReturnData;
    };
    if (("ItemConfig" in LocalReturnData.JsonData[LocalKeyName]) === false) {
        LocalReturnData.KReason = `ItemConfig: not found.!`
        return LocalReturnData;
    };
    LocalReturnData.KTF = true;
    return LocalReturnData;
};

if (MockAllowFunc.AllowMock) {
    if (MockAllowFunc.MockKey === "S5") {
        let result = StartFunc({
            DataPK: MockAllowFunc.DataPK,
            KeyName: "Masters-Accounts"
        });
        console.log("result : ", result);
    };
};


module.exports = { StartFunc };
