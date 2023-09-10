let CommonPullDataFromFile = require("../../PullDataFromFile/AsJson");
let path = require("path");

let StartFunc = ({ inFolderName, inFileNameWithExtension, inItemName, inDataPK }) => {
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

        LocalFromCommonFromCheck = CommonPullDataFromFile.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameOnly: path.parse(LocalFileNameWithExtension).name,
            inItemName: LocalinItemName,
            inDataPK: LocalDataPK
        });

        LocalReturnObject = { ...LocalFromCommonFromCheck };
        LocalReturnObject.KTF = false;

        if (LocalFromCommonFromCheck.KTF === false) {
            return LocalReturnObject;
        };

        // console.log("LocalFromCommonFromCheck111111 : ", LocalFromCommonFromCheck.JsonData[LocalinItemName]);
        LocalReturnObject.JsonData = LocalFromCommonFromCheck.JsonData[LocalinItemName];
        LocalReturnObject.KTF = true;
    };

    return LocalReturnObject;
};

module.exports = {
    StartFunc
};