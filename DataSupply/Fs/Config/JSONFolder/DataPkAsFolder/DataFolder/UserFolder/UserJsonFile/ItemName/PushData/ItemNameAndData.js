let CommonFromPushDataToFile = require("../../PushDataToFile/FolderAndFile");
let CommonCheck = require("../Check");
let MockFunc = require("../../../../../../../../../MockAllow.json")

let StartFuncNoAsync = ({ FolderName, FileName, NewData, DataPK }) => {
    let LocalinItemName = (Object.keys(NewData)).toString();
    let LocalinFolderName = FolderName;
    let LocalinFileNameOnly = FileName;
    let LocalinNewData = NewData[LocalinItemName];

    let LocalinDataPK = DataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonCheck.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalinItemName,
        inDataPK: LocalinDataPK
    });

    LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;


    if (LocalFromCommonFromCheck.KTFFromRoot === false) {
        return LocalReturnData;
    };

    if (LocalFromCommonFromCheck.KTF) {
        return LocalReturnData;
    };

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromCommonFromCheck.JsonData));

    LocalNewData[LocalinItemName] = LocalinNewData;

    let LocalFromPush = CommonFromPushDataToFile.InsertToJsonNoAsync({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK,
        inDataToUpdate: LocalNewData,
        inOriginalData: LocalFromCommonFromCheck.JsonData
    });

    if (LocalFromPush.KTF) {
        LocalReturnData.KTF = true;
        return LocalReturnData;
    };


    return LocalReturnData;
};
if (MockFunc.AllowMock) {
    if (MockFunc.MockKey === "LLPP") {
        let localData = StartFuncNoAsync({
            DataPK: MockFunc.DataPK,
            FolderName: "Masters",
            FileName: "Items",
            NewData: {
                "kk": {
                    "ItemName": "banana"
                }
            }
        });
        console.log("localData:", localData);

    };
};

module.exports = { StartFuncNoAsync };
