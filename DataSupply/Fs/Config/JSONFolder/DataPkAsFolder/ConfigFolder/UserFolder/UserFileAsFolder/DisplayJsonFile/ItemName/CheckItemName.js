let CommonPullDataFromFile = require("../PullDataFromFile/AsJson");

let StartFuncNoSync = ({ inFolderName, inFileNameOnly, inItemName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalFromCommonFromPullData;
        let LocalFolderName = inFolderName;

        LocalFromCommonFromPullData = CommonPullDataFromFile.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameOnly,
            inDataPK: LocalDataPK
        });

        LocalReturnObject = { ...LocalFromCommonFromPullData };
        LocalReturnObject.KTF = false;

        if (LocalFromCommonFromPullData.KTF === false) {
            return LocalReturnObject;
        };

        if (inItemName in LocalFromCommonFromPullData.JsonData) {
            LocalReturnObject.KTF = true;
        } else {
            LocalReturnObject.KReason = `Item Name : ${inItemName} is not found!`;
        };
    };

    return LocalReturnObject;
};

module.exports = {
    StartFuncNoSync
};