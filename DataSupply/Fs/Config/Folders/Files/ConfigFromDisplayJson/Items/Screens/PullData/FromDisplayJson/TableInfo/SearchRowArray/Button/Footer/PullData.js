let CommonFromPullData = require("../PullData");
let LocalKeyNeeded = "Footer";
let LocalKeyNeededFromWithApi = "WithApi";



let FromJsonItemConfig = async ({ inJsonConfig, inItemConfig, inDataPK }) => {
    let LocalReturnObject = { KTF: false, DirCreate: "", CreatedLog: {} };
    let LocalFromCommonFromJsonItemConfig;

    if (inDataPK > 0) {
        LocalFromCommonFromJsonItemConfig = await CommonFromPullData.FromJsonItemConfig({ inJsonConfig, inItemConfig, inDataPK });
        //console.log("LocalFromCommonFromJsonItemConfig : ", LocalFromCommonFromJsonItemConfig);

        if (LocalFromCommonFromJsonItemConfig.KTF) {
            if (LocalKeyNeeded in LocalFromCommonFromJsonItemConfig.DataFromServer) {
                LocalReturnObject.KTF = true;
                LocalReturnObject.DataFromServer = LocalFromCommonFromJsonItemConfig.DataFromServer[LocalKeyNeeded];
            };
        };
    };

    return await LocalReturnObject;
};

let FromFoldFileItemScreen = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalReturnObject = { KTF: false, DirCreate: "", CreatedLog: {} };
    let LocalFolderName = inFolderName;
    let LocalFileNameWithExtension = inFileNameWithExtension;
    let LocalItemName = inItemName;
    let LocalScreenName = inScreenName;

    let LocalFromCommonFromJsonItemConfig;

    if (inDataPK > 0) {
        LocalFromCommonFromJsonItemConfig = await CommonFromPullData.FromFoldFileItemScreen({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalItemName,
            inScreenName: LocalScreenName,
            inDataPK
        });
        //console.log("LocalFromCommonFromJsonItemConfig : ", LocalFromCommonFromJsonItemConfig);

        if (LocalFromCommonFromJsonItemConfig.KTF) {
            if (LocalKeyNeeded in LocalFromCommonFromJsonItemConfig.DataFromServer) {
                LocalReturnObject.KTF = true;
                LocalReturnObject.DataFromServer = LocalFromCommonFromJsonItemConfig.DataFromServer[LocalKeyNeeded];
            };
        };
    };

    return await LocalReturnObject;
};

let FromWithApi = async ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalReturnObject = { KTF: false, DirCreate: "", CreatedLog: {} };
    let LocalFolderName = inFolderName;
    let LocalFileNameWithExtension = inFileNameWithExtension;
    let LocalItemName = inItemName;
    let LocalScreenName = inScreenName;

    let LocalFromCommonFromJsonItemConfig;

    if (inDataPK > 0) {
        LocalFromCommonFromJsonItemConfig = await CommonFromPullData.FromFoldFileItemScreen({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inItemName: LocalItemName,
            inScreenName: LocalScreenName,
            inDataPK
        });
        // console.log("LocalFromCommonFromJsonItemConfig : ", LocalFromCommonFromJsonItemConfig);

        if (LocalFromCommonFromJsonItemConfig.KTF) {
            if (LocalKeyNeeded in LocalFromCommonFromJsonItemConfig.DataFromServer) {
                LocalReturnObject.KTF = true;
                // console.log("jjjjjjj:",LocalFromCommonFromJsonItemConfig.DataFromServer[LocalKeyNeeded].LocalKeyNeededFromWithApi);
                LocalReturnObject.DataFromServer = LocalFromCommonFromJsonItemConfig.DataFromServer[LocalKeyNeeded][LocalKeyNeededFromWithApi];
            };
        };
    };

    return await LocalReturnObject;
};

let MockFuncFromFolderFile = async () => {
    return await FromWithApi({
        inFolderName: "Masters",
        inFileNameWithExtension: "Customers.json",

        inItemName: "CustomerNames",
        inScreenName: "Create",
        inDataPK: 1018
    });
};

// MockFuncFromFolderFile().then(p => { console.log("p:", p) })

module.exports = {
    FromJsonItemConfig,
    FromFoldFileItemScreen,
    FromWithApi
};