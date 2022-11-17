let CommonPullData = require("../../../PullData/FromDataFolder/FromFolderAndFile");
let CommonPushData = require("../../../PushData/ToDataFolder/FromFolderAndFile");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inData, inDataPK }) => {
    let LocalReturnData = { KTF: false, DirCreate: "", DataFolder: true };

    let LocalFromPullData = await CommonPullData.FullJsonData({
        inFolderName,
        inFileNameWithExtension,
        inDataPK
    });

    if (LocalFromPullData.KTF === false) {
        LocalReturnData.KReason = LocalFromPullData.KReason;

        return await LocalReturnData;
    };

    let LocalPullData = LocalFromPullData.KResult;
    let LocalUpdatedData = JSON.parse(JSON.stringify(LocalPullData));

    LocalUpdatedData[inItemName] = inData;

    let LocalFromCommonPushData = await CommonPushData.AsAsync({
        inFolderName, inFileNameWithExtension, inDataPK,
        inDataToUpdate: LocalUpdatedData,
        inOriginalData: LocalPullData
    });
    console.log("LocalFromCommonPushData : ", LocalFromCommonPushData);
    return await LocalReturnData;
};

module.exports = {
    StartFunc
};
