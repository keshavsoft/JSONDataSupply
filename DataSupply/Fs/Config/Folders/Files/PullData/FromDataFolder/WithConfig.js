let CommonCheck = require("../../Check");

let fs = require("fs");

let FullJsonData = async ({ inJsonConfig, inDataPK }) => {
    let LocalReturnData = { KTF: false, KResult: [] };
    let LocalDataPK = inDataPK;

    if (LocalDataPK > 0) {
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFolderName = inJsonConfig.inFolderName;
        let LocalFileNameWithExtension = inJsonConfig.inJsonFileName;
        let LocalFilePath;

        LocalDataFromCommonCreate = await CommonCheck.ForFile({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inUserPK: LocalDataPK
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

let FullJsonDataAsArray = async ({ inJsonConfig, inDataPK }) => {
    let LocalReturnData = { KTF: false, KResult: [] };
    let LocalDataPK = inDataPK;
    let LocalData;
    let LocalArray;

    if (LocalDataPK > 0) {
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFolderName = inJsonConfig.inFolderName;
        let LocalFileNameWithExtension = inJsonConfig.inJsonFileName;
        let LocalFilePath;

        LocalDataFromCommonCreate = await CommonCheck.ForFile({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inUserPK: LocalDataPK
        });

        if (LocalDataFromCommonCreate.KTF) {
            LocalFilePath = LocalDataFromCommonCreate.FilePath

            LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
            LocalData = JSON.parse(LocalDataFromJSON);

            console.log("LocalReturnData---------- : ", Object.keys(LocalData));

            Object.values(LocalData).forEach((key) => {
                LocalReturnData.KResult = [...LocalReturnData.KResult, ...Object.values(key)];
            });

            console.log("LocalReturnData : ", LocalReturnData.KResult.length, LocalReturnData.KResult[0]);
            LocalReturnData.KTF = true;
        };

        return await LocalReturnData;
    };
};

module.exports = {
    FullJsonData,
    FullJsonDataAsArray
};