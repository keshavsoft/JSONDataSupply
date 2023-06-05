let CommonCheck = require("../CheckItemName");

let StartFuncNoSync = ({ inFolderName, inFileNameOnly, inItemName, inScreenName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalFromCommonFromPullData;
        let LocalFolderName = inFolderName;
        let LocalinItemName = inItemName;
        let LocalinScreenName = inScreenName;

        LocalFromCommonFromPullData = CommonCheck.StartFuncNoSync({
            inFolderName: LocalFolderName,
            inFileNameOnly,
            inItemName: LocalinItemName,
            inDataPK: LocalDataPK
        });

        LocalReturnObject = { ...LocalFromCommonFromPullData };
        LocalReturnObject.KTF = false;

        if (LocalFromCommonFromPullData.KTF === false) {
            LocalReturnObject.KTFFromRoot = false;
            return LocalReturnObject;
        };

        if ((LocalinScreenName in LocalFromCommonFromPullData.JsonData[LocalinItemName]) === false) {
            LocalReturnObject.KReason = `Screen Name : ${LocalinScreenName} not found!`;
            return LocalReturnObject;
        };

        LocalReturnObject.KTF = true;
    };

    return LocalReturnObject;
};

module.exports = {
    StartFuncNoSync
};