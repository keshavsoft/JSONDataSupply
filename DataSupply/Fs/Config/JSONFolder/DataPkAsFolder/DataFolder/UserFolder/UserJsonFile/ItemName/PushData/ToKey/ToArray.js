let CommonFromPullDataFromFile = require("../../../PullDataFromFile/FromFolderAndFile");
let CommonFromPushDataToFile = require("../../../PushDataToFile/FolderAndFile");

let StartFunc = async ({ inFolderName, inFileNameOnly, inItemName, inDataPK, inDataToInsert, inMainRowPK }) => {
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

    if ((LocalinItemName in LocalFromCommonFromCheck.JsonData) === false) {
        LocalReturnData.KReason = `Item Name : ${LocalinItemName} not found!`;
        return LocalReturnData;
    };

    if ((inMainRowPK in LocalFromCommonFromCheck.JsonData[LocalinItemName]) === false) {
        LocalReturnData.KReason = `MainRowPK : ${inMainRowPK} not found!`;
        return LocalReturnData;
    };

    LocalFromCommonFromCheck.JsonData[LocalinItemName][inMainRowPK].push(inDataToInsert);

    let LocalFromPush = await CommonFromPushDataToFile.InsertToJson({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK,
        inDataToUpdate: LocalFromCommonFromCheck.JsonData,
        inOriginalData: ""
    });

    LocalReturnData.KTF = true;

    return await LocalReturnData;
};

// console.log("ForExistence----- : ", ReturnAsArrayWithPKSortByPK({
//     inFolderName: "Transactions",
//     inFileNameOnly: "GST-SALES",
//     inItemName: "FERTLIZERS-GST--SALES",
//     inDataPK: 1024
// }).JsonData[0]);

module.exports = { StartFunc };
