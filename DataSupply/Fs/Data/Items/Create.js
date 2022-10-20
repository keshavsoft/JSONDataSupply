const path = require('path');
let fs = require("fs");

//let CommonCreateFolder = require("../../Files/Create");
let CommonConfig = require("../../Config/Folders/Files/Check/InDataFolder");

let StartFunc = ({ inFolderName, inFileNameWithExtension, inUserPK }) => {
    let LocalReturnData = CommonConfig.StartFunc({ inFolderName, inFileNameWithExtension, inUserPK });
    let LocalFileToCreate;

    if (LocalReturnData.KTF) {
        LocalFileToCreate = `${LocalReturnData.FilePath}/Display.json`;

        if (!fs.existsSync(LocalFileToCreate)) {
            LocalReturnData.FilePath = fs.writeFileSync(LocalFileToCreate, JSON.stringify({}));
        } else {
            LocalReturnData.FilePath = LocalFileToCreate;
        };
    };

    return LocalReturnData;
};

module.exports = { StartFunc };