let fs = require("fs");
let CommonFolder = require("../../Check");
let CommonFolderCheck = require("../../Check/InDataFolder/Check");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inUserPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", FilePath: "", CreatedLog: {} };

    let LocalFolderInfo = CommonFolder.ForExistence({ inFolderName, inUserPK });

    if (LocalFolderInfo.KTF) {
        LocalReturnData.DirPath = LocalFolderInfo.DirPath;
        LocalReturnData.FilePath = `${LocalReturnData.DirPath}/${inFileNameWithExtension}`;

        if (fs.existsSync(LocalReturnData.FilePath)) {
            LocalReturnData.KTF = true;
        };
    };

    return await LocalReturnData;
};

let WithFileNameOnly = async ({ inFolderName, inFileName, inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", FilePath: "", CreatedLog: {} };

    let LocalFolderInfo = CommonFolderCheck.ForExistence({
        inFolderName,
        inDataPk: inDataPK
    });

    if (LocalFolderInfo.KTF) {
        LocalReturnData.DirPath = LocalFolderInfo.DirPath;
        LocalReturnData.FilePath = `${LocalReturnData.DirPath}/${inFileName}.json`;

        if (fs.existsSync(LocalReturnData.FilePath)) {
            LocalReturnData.KTF = true;
        };
    };

    return await LocalReturnData;
};

module.exports = { StartFunc, WithFileNameOnly };