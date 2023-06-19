let CommonCheckKey = require("../CheckKey");
let commomTemplate = require("../../../../../../../../Fix/Adimin/PreloadJsonFile/Template.json")
let CommonPushDataToFile = require("../../PushDataToFile/ToJson");
let MockAllowFunc = require("../../../../../../../../MockAllow.json");

let StartFunc = ({ DataPK, inNewKeyName }) => {
    let LocalinDataPK = DataPK;
    let LocalinNewKeyName = inNewKeyName;
    let localcommomTemplate = commomTemplate;


    let LocalPullDataFromFile = CommonCheckKey.StartFunc({
        DataPK: LocalinDataPK,
        KeyName: LocalinNewKeyName
    });
    let LocalReturnData = { ...LocalPullDataFromFile };
    LocalReturnData.KTF = false;

    if ((LocalPullDataFromFile.KTF) === false) {
        LocalReturnData.KReason = LocalPullDataFromFile.KReason;
        return LocalReturnData;
    };


    if (LocalPullDataFromFile.KTF) {
        LocalReturnData.KReason = `Key : ${LocalinNewKeyName} already found in PreloadJsonPath!`
        return LocalReturnData;
    };
    LocalReturnData.JsonData[LocalinNewKeyName] = localcommomTemplate;

    let localupdata = CommonPushDataToFile.StartFunc({
        DataPK: LocalinDataPK,
        inOriginalData: LocalPullDataFromFile.JsonData,
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
            inNewKeyName: "Masters-Accountsss"
        });
        console.log("result : ", result);
    };
};

module.exports = { StartFunc };
