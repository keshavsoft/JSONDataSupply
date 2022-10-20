let CommonFromConfig = require("../../../../PullData/FromConfig");

let FromDisplayJson = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inUserPK }) => {
    if (inUserPK > 0) {
        let LocalReturnObject = { KTF: false, KResult: {} };
        let LocalFromCommonFromConfig = await CommonFromConfig.FromFolderAndFile({ inFolderName, inFileNameWithExtension, inUserPK });

        if (inItemName in LocalFromCommonFromConfig) {
            if (inScreenName in LocalFromCommonFromConfig[inItemName]) {
                LocalReturnObject.KTF = true;
                LocalReturnObject.DisplayJsonData = LocalFromCommonFromConfig[inItemName][inScreenName];
            } else {
                LocalReturnObject.KReason = "Item Name not found!";
            };
        } else {
            LocalReturnObject.KReason = "Item Name not found!";
        };

        return await LocalReturnObject;
    };
};

let FromJsonAndItemConfig = async ({ inJsonConfig, inItemConfig, inDataPK }) => {
    if (inDataPK > 0) {
        let LocalItemName = inItemConfig.inItemName;
        let LocalScreenName = inItemConfig.inScreenName;

        let LocalReturnObject = { KTF: false, KResult: {} };
        let LocalFromCommonFromConfig = await CommonFromConfig.AsJsonAsync({ inJsonConfig, inUserPK: inDataPK });

        if (LocalItemName in LocalFromCommonFromConfig) {
            if (LocalScreenName in LocalFromCommonFromConfig[LocalItemName]) {
                LocalReturnObject.KTF = true;
                LocalReturnObject.DisplayJsonData = LocalFromCommonFromConfig[LocalItemName][LocalScreenName];
            } else {
                LocalReturnObject.KReason = "Item Name not found!";
            };
        } else {
            LocalReturnObject.KReason = "Item Name not found!";
        };
        return await LocalReturnObject;
    };
};

module.exports = {
    FromDisplayJson,
    FromJsonAndItemConfig
};