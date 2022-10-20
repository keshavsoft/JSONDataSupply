let CommonFromPullData = require("../ReturnAsJson");
let CommonKeyNeeded = "TableInfo";

let FromJsonItemConfig = async ({ inJsonConfig, inItemConfig, inDataPK }) => {
    let LocalReturnObject = { KTF: false, DirCreate: "", CreatedLog: {} };
    let LocalFromCommonFromJsonItemConfig;

    if (inDataPK > 0) {
        LocalFromCommonFromJsonItemConfig = await CommonFromPullData.FromJsonItemConfig({ inJsonConfig, inItemConfig, inDataPK });
        //console.log("LocalFromCommonFromJsonItemConfig : ", LocalFromCommonFromJsonItemConfig);

        if (LocalFromCommonFromJsonItemConfig.KTF) {
            if (CommonKeyNeeded in LocalFromCommonFromJsonItemConfig.DataFromServer) {
                LocalReturnObject.KTF = true;
                LocalReturnObject.DataFromServer = LocalFromCommonFromJsonItemConfig.DataFromServer[CommonKeyNeeded];
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

    //= await CommonFromJsonItemConfig.ReturnAsJson({ inJsonConfig, inItemConfig, inDataPK });

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
            if (CommonKeyNeeded in LocalFromCommonFromJsonItemConfig.DataFromServer) {
                LocalReturnObject.KTF = true;
                LocalReturnObject.DataFromServer = LocalFromCommonFromJsonItemConfig.DataFromServer[CommonKeyNeeded];
            };
        };
    };

    return await LocalReturnObject;
};

let MockFuncFromFolderFile = async () => {
    return await FromJsonItemConfig({
        inJsonConfig: {
            inFolderName: "Masters",
            inJsonFileName: "Customers.json"
        },
        inItemConfig: {
            inItemName: "CustomerNames",
            inScreenName: "Create"
        },
        inDataPK: 1018
    });
};

//MockFuncFromFolderFile().then(p => { console.log("p:", p) })

module.exports = {
    FromJsonItemConfig,
    FromFoldFileItemScreen
};