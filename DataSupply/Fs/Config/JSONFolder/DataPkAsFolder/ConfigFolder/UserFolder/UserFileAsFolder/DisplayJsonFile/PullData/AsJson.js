let CommonCheck = require("../Check");
let path = require("path");
let fs = require("fs");

let StartFunc = async ({ inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFolderName = inFolderName;
        let LocalFileNameOnly = inFileNameOnly;
        let LocalFilePath;

        LocalDataFromCommonCreate = CommonCheck.ForExistence({
            inFolderName: LocalFolderName,
            inFileNameOnly: LocalFileNameOnly,
            inDataPK: LocalDataPK
        });

        if (LocalDataFromCommonCreate.KTF === false) {
            LocalReturnObject.KReason = LocalDataFromCommonCreate.KReason;
            return await LocalReturnObject;
        };

        LocalFilePath = LocalDataFromCommonCreate.DisplayJsonPath
        LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
        LocalReturnObject.JsonData = JSON.parse(LocalDataFromJSON);

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

let FromFoldFile = async ({ inFolderName, inFileNameWithExtension, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;
        let LocalFilePath;

        LocalDataFromCommonCreate = CommonCheck.ForExistence({
            inFolderName: LocalFolderName,
            inFileNameOnly: path.parse(LocalFileNameWithExtension).name,
            inDataPK: LocalDataPK
        });

        if (LocalDataFromCommonCreate.KTF === false) {
            LocalReturnObject.KReason = LocalDataFromCommonCreate.KReason;
            return await LocalReturnObject;
        };

        LocalFilePath = LocalDataFromCommonCreate.DisplayJsonPath
        LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
        LocalReturnObject.JsonData = JSON.parse(LocalDataFromJSON);

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

let FromJsonConfig = async ({ inJsonConfig, inDataPK }) => {
    let LocalDataPK = inDataPK;

    let LocalReturnObject = {
        KTF: false,
        JsonData: {}
    };

    if (LocalDataPK > 0) {
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFolderName = inJsonConfig.inFolderName;
        let LocalFileNameWithExtension = inJsonConfig.inJsonFileName;
        let LocalFilePath;

        LocalDataFromCommonCreate = CommonCheck.ForExistence({
            inFolderName: LocalFolderName,
            inFileNameOnly: path.parse(LocalFileNameWithExtension).name,
            inDataPK: LocalDataPK
        });
        console.log("LocalDataFromCommonCreate---",LocalDataFromCommonCreate);

        if (LocalDataFromCommonCreate.KTF === false) {
            LocalReturnObject.KReason = LocalDataFromCommonCreate.KReason;
            return await LocalReturnObject;
        };

        LocalFilePath = LocalDataFromCommonCreate.DisplayJsonPath
        LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
        LocalReturnObject.JsonData = JSON.parse(LocalDataFromJSON);

        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

// FromFoldFile({
//     inFolderName: "Masters",
//     inFileNameWithExtension: "Customers.json",
//     inDataPK: 16
// }).then(p => {
//     console.log("pppp : ", p);
// });

// FromJsonConfig({
//     inJsonConfig:{
//         inFolderName: "Masters",
//         inJsonFileName: "Customers.json"
//     },
//     inDataPK: 16
// }).then(p => {
//     console.log("pppp : ", p);
// });

module.exports = {
    FromFoldFile,
    FromJsonConfig,
    StartFunc
};