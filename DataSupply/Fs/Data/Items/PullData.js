//let CommonCreateInData = require("./Create");
let CommonCheck = require("../../Config/Folders/Files/Check/InDataFolder");
//let CommonDisplayFuncs = require("../../DefultFileNames/Display/PullData");

let fs = require("fs");

let ReturnDataFromJsonWithItemNameAsync = async ({ inJsonConfig, inItemConfig, inUserPK }) => {
    if (inUserPK > 0) {
        let LocalReturnData;
        let LocalReturnDataWithItemName;
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFolderName = inJsonConfig.inFolderName;
        let LocalFileNameWithExtension = inJsonConfig.inJsonFileName;
        let LocalFilePath;
        let LocalItemName = inItemConfig.inItemName;

        LocalDataFromCommonCreate = await CommonCheck.StartFunc({ inFolderName: LocalFolderName, inFileNameWithExtension: LocalFileNameWithExtension, inUserPK });

        if (LocalDataFromCommonCreate.KTF) {
            LocalFilePath = LocalDataFromCommonCreate.FilePath

            LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
            LocalReturnData = JSON.parse(LocalDataFromJSON);

            Object.freeze(LocalReturnData);
            LocalReturnDataWithItemName = LocalReturnData[LocalItemName];
        };
        return await LocalReturnDataWithItemName;
    };
};

module.exports = {
    ReturnDataFromJsonWithItemNameAsync
};