let CommonFromCheck = require("../../PullData/NoSync");

let StartFunc = ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalFromCommonFromCheck;
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;
        let LocalinItemName = inItemName;
        let LocalinScreenName = inScreenName;

        LocalFromCommonFromCheck = CommonFromCheck.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalinItemName,
            inScreenName: LocalinScreenName,
            inDataPK: LocalDataPK
        });
        //  console.log("bbbbbbbbbbb--- : ", LocalFromCommonFromCheck);
        if (LocalFromCommonFromCheck.KTF === false) {
            LocalReturnObject.KReason = LocalFromCommonFromCheck.KReason;
            return LocalReturnObject;
        };

        LocalReturnObject.JsonData = LocalFromCommonFromCheck.JsonData[LocalinScreenName];
        LocalReturnObject.KTF = true;
    };

    return LocalReturnObject;
};

module.exports = {
    StartFunc
};