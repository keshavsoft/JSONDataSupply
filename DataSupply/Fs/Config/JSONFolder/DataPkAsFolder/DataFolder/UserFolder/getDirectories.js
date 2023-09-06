const fs = require("fs");
let CommonFromCheck = require("./Check");

let AsArray = ({ inFolderName, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalFolderName = inFolderName;

    let LocalFromCommonFromCheck = CommonFromCheck.ForExistence({
        inFolderName: LocalFolderName,
        inDataPK: LocalDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        return [];
    };

    let LocalDataPath = LocalFromCommonFromCheck.FolderPath;

    return fs.readdirSync(LocalDataPath).map((file) => {
        return file;
    });
};

module.exports = { AsArray };
