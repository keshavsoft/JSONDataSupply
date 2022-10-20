let CommonCheck = require("../../../../Config/Folders/Files/Check");
let fs = require("fs");
let path = require("path");

let AsArray = ({ inFolderName, inFileNameWithExtension, inUserPK }) => {
    if (inUserPK > 0) {
        let LocalReturnData;
        let LocalDataFromCommonCreate;
        let LocalDataFromJSON;
        let LocalFilePath;
        let LocalReturnArray = [];
        let LocalLoopObject = {};

        LocalCommonCheck = CommonCheck.ForFile({
            inFolderName,
            inFileNameWithExtension,
            inUserPK
        });

        if (LocalCommonCheck.KTF) {
            LocalFilePath = LocalCommonCheck.FilePath
            
            LocalDataFromJSON = fs.readFileSync(LocalFilePath);
            LocalReturnData = JSON.parse(LocalDataFromJSON);
            LocalReturnArray = Object.keys(LocalReturnData);
        };

        return LocalReturnArray;
    };
};

module.exports = {
    AsArray
};