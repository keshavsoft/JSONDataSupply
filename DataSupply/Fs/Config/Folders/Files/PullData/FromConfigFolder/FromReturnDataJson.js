let CommonCheck = require("../../Check/InDisplayJsonFolder/ForJsonFiles/ForReturnDataJson");
let path = require("path");
let fs = require("fs");

let UsingJsonConfigAsync = async ({ inJsonConfig, inDataPK }) => {
    let LocalDataPK = inDataPK;
    if (LocalDataPK > 0) {
        let LocalReturnObject = { KTF: false };

        let LocalDataFromJSON;
        let LocalFolderName = inJsonConfig.inFolderName;
        let LocalFileNameWithExtension = inJsonConfig.inJsonFileName;
        let LocalFilePath;

        let LocalFromCheck = await CommonCheck.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameOnly: path.parse(LocalFileNameWithExtension).name, inDataPK: LocalDataPK
        });

        LocalReturnObject.DirPath = LocalFromCheck.DirPath;
        LocalReturnObject.FolderPath = LocalFromCheck.FolderPath;
        LocalReturnObject.FilePath = LocalFromCheck.FilePath;
        LocalReturnObject.ReturnDataPath = LocalFromCheck.ReturnDataPath;

        if (LocalFromCheck.KTF) {
            LocalReturnObject.KTF = true;
            LocalFilePath = LocalFromCheck.ReturnDataPath;
            LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
            LocalReturnObject.JsonData = JSON.parse(LocalDataFromJSON);
            Object.freeze(LocalReturnObject.JsonData);
        };

        return await LocalReturnObject;
    };
};

let UsingFolderAndFileNameAsync = async ({ inFolderName, inFileNameWithExtension, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnData = { KTF: false };

    if (LocalDataPK > 0) {
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;
        let LocalFilePath;

        LocalDataFromCommonCreate = await CommonCheck.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameOnly: path.parse(LocalFileNameWithExtension).name, inDataPK: LocalDataPK
        });

        if (LocalDataFromCommonCreate.KTF === false) {
            LocalReturnData.KReason = LocalDataFromCommonCreate.KReason;
            return await LocalReturnData;
        };

        LocalFilePath = LocalDataFromCommonCreate.ReturnDataPath
        LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
        LocalReturnData.JsonData = JSON.parse(LocalDataFromJSON);
        LocalReturnData.KTF = true;
    };

    return await LocalReturnData;
};

module.exports = {
    UsingJsonConfigAsync,
    UsingFolderAndFileNameAsync
};