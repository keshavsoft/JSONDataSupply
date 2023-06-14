let CommonCheckPreLoadJsonFile = require("../../CheckPreLoadJsonFile");
let commomTemplate = require("../../../../../../../../Fix/Adimin/PreloadJsonFile/Template.json")
let CommonPushDataToFile = require("../../PushDataToFile/ToJson");
let MockAllowFunc = require("../../../../../../../../MockAllow.json")

let StartFunc = ({ DataPK, inNewKeyName }) => {
    let LocalinDataPK = DataPK;
    let LocalinNewKeyName = inNewKeyName;
    let localcommomTemplate = commomTemplate;

    console.log("localcommomTemplate:",localcommomTemplate);

    let LocalFromPreLoadJsonFile = CommonCheckPreLoadJsonFile.ForExistence({
        DataPK: LocalinDataPK
    });

    let LocalReturnData = { ...LocalFromPreLoadJsonFile };
    LocalReturnData.KTF = false;

    if ((LocalFromPreLoadJsonFile.KTF) === false) {

        return LocalReturnData;
    };


    LocalReturnData.CreatedLog = LocalinNewKeyName;
    LocalReturnData.CreatedLog[LocalinNewKeyName] = {};

    LocalReturnData.CreatedLog[LocalinNewKeyName][localcommomTemplate]
    console.log("LocalReturnData:", LocalReturnData);


    // LocalReturnData[inNewKeyName] = LocalFromCommonCheckKey.JsonData[LocalfromKeyName];

    // let localupdata = CommonPushDataToFile.StartFunc({
    //     DataPK: LocalinDataPK,
    //     inOriginalData: LocalFromCommonCheckKey.JsonData,
    //     inDataToUpdate: LocalReturnData
    // });
    // if (localupdata.KTF) {
    //     LocalReturnData.KTF = true;
    // };

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
