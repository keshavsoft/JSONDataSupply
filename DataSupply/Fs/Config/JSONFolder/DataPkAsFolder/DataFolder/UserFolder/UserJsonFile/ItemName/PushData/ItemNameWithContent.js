let CommonFromPullDataFromFile = require("../../PullDataFromFile/FromFolderAndFile");
let CommonFromPushDataToFile = require("../../PushDataToFile/FolderAndFile");

let StartFuncNoAsync = ({ inFolderName, inFileNameOnly, inItemName, inDataPK, inItemNameContent }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromPullDataFromFile.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    if (LocalinItemName in LocalFromCommonFromCheck.JsonData) {
        LocalReturnData.KReason = `Item Name : ${LocalinItemName} already found!`;
        return LocalReturnData;
    };

    LocalFromCommonFromCheck.JsonData[LocalinItemName] = inItemNameContent;

    let LocalFromPush = CommonFromPushDataToFile.InsertToJsonNoAsync({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK,
        inDataToUpdate: LocalFromCommonFromCheck.JsonData,
        inOriginalData: ""
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
