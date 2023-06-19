let CommonCheckKey = require("../CheckKey");
let commomTemplate = require("../../../../../../../../Fix/Adimin/PreloadJsonFile/Template.json")
let CommonPushDataToFile = require("../../PushDataToFile/ToJson");
let MockAllowFunc = require("../../../../../../../../MockAllow.json");

let CommonCreatefile = require("../../CreateFile/BoilerPlate");

let StartFunc = ({ DataPK, inNewKeyName }) => {
    let LocalinDataPK = DataPK;
    let LocalinNewKeyName = inNewKeyName;
    let localcommomTemplate = commomTemplate;


    let LocalPullDataFromFile = CommonCheckKey.StartFunc({
        DataPK: LocalinDataPK,
        KeyName: LocalinNewKeyName
    });
    if ((LocalPullDataFromFile.KTF) === false) {
        CommonCreatefile.ForExistence({ DataPK: LocalinDataPK });
    };

    let localpulldata = CommonCheckKey.StartFunc({
        DataPK: LocalinDataPK,
        KeyName: LocalinNewKeyName
    });

    let LocalReturnData = { ...localpulldata };
    LocalReturnData.KTF = false;

    if (localpulldata.KTF) {
        LocalReturnData.KReason = `Key : ${LocalinNewKeyName} already found in PreloadJsonPath!`
        return LocalReturnData;
    };
    console.log("LocalReturnData.JsonData:", LocalReturnData.JsonData);
    LocalReturnData.JsonData[LocalinNewKeyName] = localcommomTemplate;

    let localupdata = CommonPushDataToFile.StartFunc({
        DataPK: LocalinDataPK,
        inOriginalData: localpulldata.JsonData,
        inDataToUpdate: LocalReturnData.JsonData
    });
    if (localupdata.KTF) {
        LocalReturnData.KTF = true;
    };

    return LocalReturnData;
};


if (MockAllowFunc.AllowMock) {
    if (MockAllowFunc.MockKey === "SV1") {
        let result = StartFunc({
            DataPK: MockAllowFunc.DataPK,
            inNewKeyName: "Masters-Accountsss"
        });
        console.log("result : ", result);
    };
};

module.exports = { StartFunc };
