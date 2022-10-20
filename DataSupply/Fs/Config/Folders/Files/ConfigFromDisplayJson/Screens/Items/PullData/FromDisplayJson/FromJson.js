let CommonFromJsonConfig = require("../../../../../PullData/FromConfig");

let AsJsonAsync = async ({ inJsonConfig, inItemConfig, inDataPK }) => {
    let LocalItemName = inItemConfig.inItemName;
    let LocalScreenName = inItemConfig.inScreenName;
    //  console.log("LocalItemName ------ : ", LocalItemName);
    let LocalReturnData;

    if (inDataPK > 0) {
        let LocalFromJsonConfig = await CommonFromJsonConfig.AsJsonAsync({ inJsonConfig, inUserPK: inDataPK });

        if (LocalItemName in LocalFromJsonConfig) {
            if (LocalScreenName in LocalFromJsonConfig[LocalItemName]) {
                LocalReturnData = LocalFromJsonConfig[LocalItemName][LocalScreenName];
            };

        };

        return await LocalReturnData;
    };
};

let AsReturnObject = async ({ inJsonConfig, inItemConfig, inDataPK }) => {
    let LocalItemName = inItemConfig.inItemName;
    let LocalScreenName = inItemConfig.inScreenName;
    let LocalReturnObject = { KTF: false, DirCreate: "", CreatedLog: {} };

    if (inDataPK > 0) {
        let LocalFromJsonConfig = await CommonFromJsonConfig.AsJsonAsync({ inJsonConfig, inUserPK: inDataPK });

        if (LocalItemName in LocalFromJsonConfig) {
            if (LocalScreenName in LocalFromJsonConfig[LocalItemName]) {
                //LocalReturnData = LocalFromJsonConfig[LocalItemName][LocalScreenName];
                LocalReturnObject.JsonData = LocalFromJsonConfig[LocalItemName][LocalScreenName];
                LocalReturnObject.KTF = true;
            } else {
                LocalReturnObject.KReason = `ScreenName not found in Item : ${LocalItemName}`;
            };

        };

        return await LocalReturnObject;
    };
};

module.exports = {
    AsJsonAsync,
    AsReturnObject
};