let CommonFromPushDataToFile = require("../../PushDataToFile/FolderAndFile");
let CommonCheck = require("../Check");
let MockFunc = require("../../../../../../../../../MockAllow.json")

let StartFuncNoAsync = ({ FolderName, FileName, ItemName, NewData, DataPK }) => {
    let LocalinFolderName = FolderName;
    let LocalinFileNameOnly = FileName;
    let LocalinItemName = ItemName;
    let LocalinNewData = NewData;

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
    if (MockFunc.MockKey === "LLU") {
        let localData = StartFuncNoAsync({
            DataPK: MockFunc.DataPK,
            FolderName:"Masters",
            FileName:"Items",
            ItemName:"ItemName1",
            NewData:"jjjj"
        });
        console.log("localData:", localData);

    };
};


// console.log("ForExistence----- : ", ReturnAsArrayWithPKSortByPK({
//     inFolderName: "Transactions",
//     inFileNameOnly: "GST-SALES",
//     inItemName: "FERTLIZERS-GST--SALES",
//     inDataPK: 1024
// }).JsonData[0]);

module.exports = { StartFuncNoAsync };
