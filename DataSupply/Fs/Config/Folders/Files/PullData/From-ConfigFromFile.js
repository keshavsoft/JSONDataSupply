let CommonCheck = require("../Check/ConfigFromFile");
let path = require("path");
let fs = require("fs");

let AsJsonAsync = async ({ inJsonConfig, inUserPK }) => {
    //console.log("inUserPK : ", inUserPK);
    if (inUserPK > 0) {
        let LocalReturnData;
        let LocalFromCheck;
        let LocalDataFromJSON;
        let LocalFolderName = inJsonConfig.inFolderName;
        let LocalFileNameWithExtension = inJsonConfig.inJsonFileName;
        let LocalFilePath;

        LocalFromCheck = await CommonCheck.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameOnly: path.parse(LocalFileNameWithExtension).name, inUserPK
        });
        // console.log("44444444444 : ", LocalFromCheck);
        if (LocalFromCheck.KTF) {
            LocalFilePath = LocalFromCheck.FilePath
            LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
            LocalReturnData = JSON.parse(LocalDataFromJSON);
            Object.freeze(LocalReturnData);
        };
        //console.log("LocalReturnData : ", LocalReturnData);
        return await LocalReturnData;
    };
};

let AsArray = async ({ inFolderName, inFileNameWithExtension, inDataPk }) => {
    //console.log("inDataPk : ", inDataPk);
    if (inDataPk > 0) {
        let LocalReturnData;
        let LocalFromCheck;
        let LocalDataFromJSON;
        let LocalFolderName = inFolderName;
        let LocalFileNameWithExtension = inFileNameWithExtension;
        let LocalFilePath;

        LocalFromCheck = await CommonCheck.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameOnly: path.parse(LocalFileNameWithExtension).name, inUserPK: inDataPk
        });
        console.log("44444444444 : ", LocalFromCheck);
        if (LocalFromCheck.KTF) {
            LocalFilePath = LocalFromCheck.FilePath
            LocalDataFromJSON = await fs.readFileSync(LocalFilePath);
            LocalReturnData = Object.keys(JSON.parse(LocalDataFromJSON));
            //Object.freeze(LocalReturnData);
        };
        //console.log("LocalReturnData : ", LocalReturnData);
        return await LocalReturnData;
    };
};

module.exports = {
    AsJsonAsync,
    AsArray
};