let CommonFromData = require("../../../../PullData/FromData");
let CommonFromConfig = require("../../../../PullData/FromConfig");

let StartFunc = async ({ inDataPK, inFolderName, inFileNameWithExtension }) => {
    let LocalDataPK = inDataPK;
    let LocalJsonFileData = await CommonFromData.AsJsonAsyncFromFolderAndFile({
        inFolderName,
        inFileNameWithExtension,
        inUserPK: LocalDataPK
    });

    let LocalConfigData = await CommonFromConfig.FromFolderAndFile({
        inFolderName, inFileNameWithExtension,
        inUserPK: LocalDataPK
    });

    let LocalReturnObject = {};

    if (LocalConfigData !== undefined) {
        Object.entries(LocalJsonFileData).forEach(
            ([key, value]) => {
                if (key in LocalConfigData) {
                    LocalReturnObject[key] = {
                        ItemName: key,
                        RowCount: Object.keys(value).length,
                        ScreenCount: Object.keys(LocalConfigData[key]).length
                    };

                };
            });
    };

    return await LocalReturnObject;
};

module.exports = {
    StartFunc
};
