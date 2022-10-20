let CommonCreate = require("./Create");
let fs = require("fs");
//let CommonDisplay = require("../DefultFileNames/Display/PullData");
let CommonScreens = require("../Data/Screens/PullData");

let ReturnDataFromJson = async ({ inUserPK }) => {
    if (inUserPK > 0) { 
        let LocalReturnData;
        let LocalDataFromCommonCreate = await CommonCreate.CreateFileAsync({ inUserPK });
        let LocalDataFromJSON;
        let LocalFilePath;

        if (LocalDataFromCommonCreate.KTF) {
            LocalFilePath = LocalDataFromCommonCreate.FilePath;
            LocalDataFromJSON = fs.readFileSync(LocalFilePath);
            LocalReturnData = JSON.parse(LocalDataFromJSON);

            Object.freeze(LocalReturnData);
        };

        return LocalReturnData;
    };
};

let LocalFromDisplayConfig = async ({ inDataToPrepare, inUserPK }) => {
    let LocalReturnData = {};
    
    Object.entries(inDataToPrepare).forEach(
        async ([key, value]) => {
            LocalJsonConfig = {};
            LocalJsonConfig.inFolderName = value.Folder;
            LocalJsonConfig.inJsonFileName = value.File;

            LocalItemConfig = {};
            LocalItemConfig.inItemName = value.ItemName;
            LocalItemConfig.inScreenName = value.ScreenName;

            LocalReturnData[key] = await CommonScreens.ReturnDataFromJsonWithItemAndScreenNamesAsync({
                inJsonConfig: LocalJsonConfig,
                inItemConfig: LocalItemConfig,
                inUserPK
            });
        }
    );
    
    return await LocalReturnData;
};

let ReturnWithData = async ({ inUserPK }) => {
    if (inUserPK > 0) {
        let LocalReturnArray = [];
        let LocalLoopObject = {};

        let LocalReturnData;
        let LocalDataToPrepare = await ReturnDataFromJson({ inUserPK });

        LocalReturnData = await LocalFromDisplayConfig({ inDataToPrepare: LocalDataToPrepare, inUserPK });

        Object.entries(LocalReturnData).forEach(
            ([key, value]) => {
                LocalLoopObject = {};

                LocalLoopObject.LocalStorageKey = key;
                LocalLoopObject.Data = value;

                LocalReturnArray.push(LocalLoopObject);
            }
        );

        return await LocalReturnArray;
    };
};

module.exports = { ReturnWithData };