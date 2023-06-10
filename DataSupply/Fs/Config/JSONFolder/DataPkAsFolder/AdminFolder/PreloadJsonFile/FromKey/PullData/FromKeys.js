let CommonCheckKey = require("../CheckKey");

let MockAllowFunc = require("../../../../../../../../MockAllow.json")

let StartFunc = ({ DataPK, KeyName }) => {
    let LocalinDataPK = DataPK;
    let LocalKeyName = KeyName;

    let LocalFromCommonFromCheck = CommonCheckKey.StartFunc({
        DataPK: LocalinDataPK,
        KeyName: LocalKeyName
    });

    let LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF === false) {
        return LocalReturnData;
    };

    LocalReturnData.JsonData = LocalReturnData.JsonData[LocalKeyName];

    LocalReturnData.KTF = true;

    return LocalReturnData;
};

if (MockAllowFunc.AllowMock) {
    if (MockAllowFunc.MockKey === "S6") {
        let result = StartFunc({
            DataPK: MockAllowFunc.DataPK,
            KeyName: "Masters-Accounts"
        });
        console.log("result : ", result);
    };
};


module.exports = { StartFunc };
