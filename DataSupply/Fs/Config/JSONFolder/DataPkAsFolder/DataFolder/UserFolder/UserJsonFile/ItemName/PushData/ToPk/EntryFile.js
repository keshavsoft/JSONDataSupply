let CommonFromPullDataFromFile = require("../../../PullDataFromFile/FromFolderAndFile");
let CommonFromPushDataToFile = require("../../../PushDataToFile/FolderAndFile");

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inDataPK, inDataToInsert, inpk }) => {
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

    LocalFromCommonFromCheck.JsonData[LocalinItemName][inpk] = inDataToInsert;

    let LocalFromPush = CommonFromPushDataToFile.InsertToJsonNoAsync({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK,
        inDataToUpdate: LocalFromCommonFromCheck.JsonData,
        inOriginalData: ""
    });

    LocalReturnData.KTF = true;

    return LocalReturnData;
};

module.exports = { StartFunc };
