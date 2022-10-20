let CommonCheck = require("../Check");
let CommonCheckInDataFolder = require("../Check/InDataFolder");

let fs = require("fs");

let AsJsonAsync = async ({ inJsonConfig, inUserPK }) => {
    if (inUserPK > 0) {
        let LocalReturnData;
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFolderName = inJsonConfig.inFolderName;
        let LocalFileNameWithExtension = inJsonConfig.inJsonFileName;
        let LocalFilePath;

        LocalDataFromCommonCreate = await CommonCheck.ForFile({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension, inUserPK
        });

        if (LocalDataFromCommonCreate.KTF) {
            LocalFilePath = LocalDataFromCommonCreate.FilePath

            LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
            LocalReturnData = JSON.parse(LocalDataFromJSON);

            Object.freeze(LocalReturnData);
        };

        return await LocalReturnData;
    };
};

let FullJsonData = async ({ inJsonConfig, inUserPK }) => {
    let LocalReturnData = { KTF: false, KResult: [] };

    if (inUserPK > 0) {
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFolderName = inJsonConfig.inFolderName;
        let LocalFileNameWithExtension = inJsonConfig.inJsonFileName;
        let LocalFilePath;

        LocalDataFromCommonCreate = await CommonCheck.ForFile({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension, inUserPK
        });

        if (LocalDataFromCommonCreate.KTF) {
            LocalFilePath = LocalDataFromCommonCreate.FilePath

            LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
            LocalReturnData.KResult = JSON.parse(LocalDataFromJSON);
            LocalReturnData.KTF = true;
        };

        return await LocalReturnData;
    };
};

let AsJsonAsyncFromFolderAndFile = async ({ inFolderName, inFileNameWithExtension, inUserPK }) => {
    console.log("aaaaaaaaaaa : ", inFolderName, inFileNameWithExtension, inUserPK);
    if (inUserPK > 0) {
        let LocalReturnData;
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFilePath;

        LocalDataFromCommonCreate = await CommonCheck.ForFile({
            inFolderName,
            inFileNameWithExtension,
            inUserPK
        });

        if (LocalDataFromCommonCreate.KTF) {
            LocalFilePath = LocalDataFromCommonCreate.FilePath

            LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
            LocalReturnData = JSON.parse(LocalDataFromJSON);

            Object.freeze(LocalReturnData);
        };

        return await LocalReturnData;
    };
};

let AsJsonAsyncFromFolderAndFileNameOnly = async ({ inFolderName, inFileName, inDataPK }) => {
    if (inDataPK > 0) {
        let LocalReturnData;
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFilePath;

        LocalDataFromCommonCreate = await CommonCheckInDataFolder.WithFileNameOnly({
            inFolderName,
            inFileName,
            inDataPK
        });

        if (LocalDataFromCommonCreate.KTF) {
            LocalFilePath = LocalDataFromCommonCreate.FilePath

            LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
            LocalReturnData = JSON.parse(LocalDataFromJSON);

            Object.freeze(LocalReturnData);
        };

        return await LocalReturnData;
    };
};

module.exports = {
    AsJsonAsync,
    AsJsonAsyncFromFolderAndFile,
    FullJsonData,
    AsJsonAsyncFromFolderAndFileNameOnly
};