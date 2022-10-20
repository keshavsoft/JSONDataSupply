let CommonCheck = require("../../Check");
let path = require("path");
let fs = require("fs");

let AsJsonAsync = async ({ inJsonConfig, inDataPK }) => {
    //console.log("inUserPK : ", inUserPK);
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

        LocalDataFromCommonCreate = await CommonCheck.InConfig({
            inFolderName: LocalFolderName,
            inFileNameOnly: path.parse(LocalFileNameWithExtension).name, inUserPK: LocalDataPK
        });

        if (LocalDataFromCommonCreate.KTF) {
            LocalFilePath = LocalDataFromCommonCreate.FilePath
            LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
            LocalReturnObject.JsonData = JSON.parse(LocalDataFromJSON);

            LocalReturnObject.KTF = true;
        };
    };

    return await LocalReturnObject;
};

module.exports = {
    AsJsonAsync
};