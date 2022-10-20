//let CommonCheck = require("../../Check/InDisplayJsonFolder/ForJsonFiles/ForReturnDataJson");
let path = require("path");
let fs = require("fs");
let CommonCheck = require("../../../Check/InDisplayJsonFolder/ForJsonFiles/ForReturnDataJson");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnObject = { KTF: false, KReason: "", JsonData: {} };

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

        if (LocalDataFromCommonCreate.KTF) {
            LocalFilePath = LocalDataFromCommonCreate.ReturnDataPath
            LocalDataFromJSON = await fs.readFileSync(LocalFilePath);

            LocalReturnObject.JsonData = JSON.parse(LocalDataFromJSON);
            LocalReturnObject.KTF = true;
        };
    };

    return await LocalReturnObject
};

module.exports = {
    StartFunc
};