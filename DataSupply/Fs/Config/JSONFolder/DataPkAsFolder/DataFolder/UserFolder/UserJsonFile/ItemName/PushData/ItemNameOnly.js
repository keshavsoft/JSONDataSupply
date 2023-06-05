let CommonFromPushDataToFile = require("../../PushDataToFile/FolderAndFile");
let CommonCheck = require("../Check");

let StartFuncNoAsync = ({ inFolderName, inFileNameOnly, inItemName, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonCheck.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalinItemName,
        inDataPK: LocalinDataPK
    });
    
    LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF) {
        return LocalReturnData;
    };

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromCommonFromCheck.JsonData));

    LocalNewData[LocalinItemName] = {};

    let LocalFromPush = CommonFromPushDataToFile.InsertToJsonNoAsync({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK,
        inDataToUpdate: LocalNewData,
        inOriginalData: LocalFromCommonFromCheck.JsonData
    });
    
    if (LocalFromPush.KTF === false) {
        LocalReturnData.KReason = LocalFromPush.KReason;
        return LocalReturnData;
    };

    LocalReturnData.KTF = true;

    return LocalReturnData;
};

// console.log("ForExistence----- : ", ReturnAsArrayWithPKSortByPK({
//     inFolderName: "Transactions",
//     inFileNameOnly: "GST-SALES",
//     inItemName: "FERTLIZERS-GST--SALES",
//     inDataPK: 1024
// }).JsonData[0]);

module.exports = { StartFuncNoAsync };
