let CommonCheck = require("../CheckScreenName");

let StartFuncNoSync = ({ inFolderName, inFileNameOnly, inItemName, inScreenName, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalKeyToCheck = "TableColumns";

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalFromCommonFromPullData;
        let LocalFolderName = inFolderName;
        let LocalinFileNameOnly = inFileNameOnly;
        let LocalinItemName = inItemName;
        let LocalinScreenName = inScreenName;

        LocalFromCommonFromPullData = CommonCheck.StartFuncNoSync({
            inFolderName: LocalFolderName,
            inFileNameOnly: LocalinFileNameOnly,
            inItemName: LocalinItemName,
            inScreenName: LocalinScreenName,
            inDataPK: LocalDataPK
        });

        LocalReturnObject = { ...LocalFromCommonFromPullData };
        LocalReturnObject.KTF = false;

        if (LocalFromCommonFromPullData.KTF === false) {
            LocalReturnObject.KTFFromRoot = false;
            return LocalReturnObject;
        };

        LocalReturnObject.JsonData = LocalFromCommonFromPullData.JsonData

        if (LocalKeyToCheck in LocalFromCommonFromPullData.JsonData[LocalinItemName][LocalinScreenName]) {
            LocalReturnObject.KTF = true;
        };
    };

    return LocalReturnObject;
};

module.exports = {
    StartFuncNoSync
};