let CommonFromData = require("../../../../PullData/FromData");
let CommonFromConfig = require("../../../../PullData/FromConfig");

let StartFunc = async ({ inDataPK, inFolderName, inFileNameWithExtension }) => {
    let LocalDataPk = inDataPK;
    let LocalJsonFileData = await CommonFromData.AsJsonAsyncFromFolderAndFile({
        inFolderName,
        inFileNameWithExtension, inUserPK: LocalDataPk
    });

    let LocalConfigData = await CommonFromConfig.FromFolderAndFile({
        inFolderName, inFileNameWithExtension,
        inUserPK: LocalDataPk
    });

    let LocalReturnObject = {};

    Object.entries(LocalJsonFileData).forEach(
        ([key, value]) => {
            let LocalScreens = {};
            if (key in LocalConfigData) {
                Object.keys(LocalConfigData[key]).forEach(LoopConfig => {
                    LocalScreens[LoopConfig] = {
                        ScreenName: LoopConfig
                    };
                });
            };

            LocalReturnObject[key] = {
                ItemName: key,
                RowCount: Object.keys(value).length,
                Screens: LocalScreens
            };
        });

    return await LocalReturnObject;
};

let LocalMockFunc = async () => {
    let LocalData = await StartFunc({
        inDataPK: 1022,
        inFolderName: "Masters",
        inFileNameWithExtension: "Products.json"
    });
};

// LocalMockFunc().then(P => {
// });

module.exports = {
    StartFunc
};