let CommonFromReturnDataJson = require("../../../../../PullData/FromConfigFolder/FromReturnDataJson");

let UsingJsonConfigAsync = async ({ inJsonConfig, inItemConfig, inDataPK }) => {
    let LocalDataPK = inDataPK;

    if (LocalDataPK > 0) {
        let LocalReturnObject = { KTF: false };

        let LocalItemName = inItemConfig.inItemName;
        let LocalScreenName = inItemConfig.inScreenName;

        let LocalFromReturnDataJson = await CommonFromReturnDataJson.UsingJsonConfigAsync({
            inJsonConfig, inDataPK: LocalDataPK
        });

        LocalReturnObject.DirPath = LocalFromReturnDataJson.DirPath;
        LocalReturnObject.FolderPath = LocalFromReturnDataJson.FolderPath;
        LocalReturnObject.FilePath = LocalFromReturnDataJson.FilePath;
        LocalReturnObject.ReturnDataPath = LocalFromReturnDataJson.ReturnDataPath;
        
        if (LocalFromReturnDataJson.KTF) {
            if (LocalItemName in LocalFromReturnDataJson.JsonData) {
                if (LocalScreenName in LocalFromReturnDataJson.JsonData[LocalItemName]) {
                    LocalReturnObject.KTF = true;
                    LocalReturnObject.JsonData = LocalFromReturnDataJson.JsonData[LocalItemName][LocalScreenName];
                } else {
                    LocalReturnObject.KReason = `${LocalScreenName} : ScreenName not found in returndata.json:${LocalItemName}`;
                };
            } else {
                LocalReturnObject.KReason = `${LocalItemName} : ItemName not found in returndata.json`;
            };
        };

        return await LocalReturnObject;
    };
};

module.exports = {
    UsingJsonConfigAsync
};