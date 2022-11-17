let CommonPullData = require("../../PullData/FromDataFolder/FromFolderAndFile");
let CommonPushData = require("../../PushData/ToDataFolder/FromFolderAndFile");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inData, inDataPK }) => {
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

    let LocalFromCommonPushData = await CommonPushData.AsAsync({
        inFolderName, inFileNameWithExtension, inDataPK,
        inDataToUpdate: inData,
        inOriginalData: LocalPullData
    });
    
    return await LocalReturnData;
};

module.exports = {
    StartFunc
};
