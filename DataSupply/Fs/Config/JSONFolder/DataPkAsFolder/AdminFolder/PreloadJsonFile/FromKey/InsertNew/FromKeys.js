let commomTemplate = require("../../../../../../../../Fix/Adimin/PreloadJsonFile/Template.json")
let CommonPushDataToFile = require("../../PushDataToFile/ToJson");
let MockAllowFunc = require("../../../../../../../../MockAllow.json");
let CommonCheckKey = require("../CheckKey");

let StartFunc = ({ DataPK, inNewKeyName }) => {
    let LocalinDataPK = DataPK;
    let LocalinNewKeyName = inNewKeyName;
    let localcommomTemplate = commomTemplate;

    let localCommonCheckKey = CommonCheckKey.StartFunc({ DataPK: LocalinDataPK, KeyName: LocalinNewKeyName });

    let LocalReturnData = { ...localCommonCheckKey };
    LocalReturnData.KTF = false;

    if (localCommonCheckKey.KTFFromRoot === false) {
        return LocalReturnData;
    };

    if (localCommonCheckKey.KTF) {
        LocalReturnData.KReason = "Key already Present..";
        return LocalReturnData;
    };

    LocalReturnData.JsonData[LocalinNewKeyName] = localcommomTemplate;

    let localupdata = CommonPushDataToFile.StartFunc({
        DataPK: LocalinDataPK,
        inOriginalData: localCommonCheckKey.JsonData,
        inDataToUpdate: LocalReturnData.JsonData
    });
    if (localupdata.KTF) {
        LocalReturnData.KTF = true;
    };

    return LocalReturnData;
};

if (MockAllowFunc.AllowMock) {
    if (MockAllowFunc.MockKey === "ssv") {
        let result = StartFunc({
            DataPK: MockAllowFunc.DataPK,
            inNewKeyName: "Masters-Acc"
        });
        console.log("result : ", result);
    };
};

module.exports = { StartFunc };
