let CommonPullData = require("../../../../../PullData/FromConfig");

let CommonPullDataFromConfigFolder = require("../../../../../PullData/FromConfigFolder/FromDisplayJson/AsJson");

let FromJsonItemConfig = async ({ inJsonConfig, inItemConfig, inDataPK }) => {
    let LocalReturnObject = { KTF: false, DirCreate: "", CreatedLog: {} };

    if (inDataPK > 0) {
        let LocalReturnData;
        let LocalOriginalData;
        let LocalFolderName = inJsonConfig.inFolderName;
        let LocalFileNameWithExtension = inJsonConfig.inJsonFileName;
        let LocalItemName = inItemConfig.inItemName;
        let LocalScreenName = inItemConfig.inScreenName;

        LocalOriginalData = await CommonPullData.FromFolderAndFile({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inUserPK: inDataPK
        });
        //   console.log("LocalOriginalData : ", LocalOriginalData);
        if (LocalItemName in LocalOriginalData) {
            if (LocalScreenName in LocalOriginalData[LocalItemName]) {
                LocalReturnObject.KTF = true;
                LocalReturnObject.DataFromServer = LocalOriginalData[LocalItemName][LocalScreenName];
            };
        };
    };

    return await LocalReturnObject;
};

let FromFoldFileItemScreen = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalReturnObject = { KTF: false, DirCreate: "", CreatedLog: {} };

    if (inDataPK > 0) {
        let LocalReturnData;
        let LocalOriginalData;
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;
        let LocalItemName = inItemName;
        let LocalScreenName = inScreenName;

        LocalOriginalData = await CommonPullData.FromFolderAndFile({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inUserPK: inDataPK
        });
        //   console.log("LocalOriginalData : ", LocalOriginalData);
        if (LocalItemName in LocalOriginalData) {
            if (LocalScreenName in LocalOriginalData[LocalItemName]) {
                LocalReturnObject.KTF = true;
                LocalReturnObject.DataFromServer = LocalOriginalData[LocalItemName][LocalScreenName];
            };
        };
    };

    return await LocalReturnObject;
};

module.exports = {
    FromJsonItemConfig,
    FromFoldFileItemScreen
};