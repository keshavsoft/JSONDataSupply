let fs = require("fs");
let CommonAbsolutePath = require("../../../../DataPath");

let ForExistence = ({ inDataPK }) => {
    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFolderName = "Reports";

    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
    LocalReturnData.ReportsPath = `${GlobalDataPath}/${LocalinDataPK}/${LocalFolderName}`

    try {
        if (fs.statSync(LocalReturnData.DirPath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "File not found!";
        }
    } catch (error) {
        LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

let LocalReturnFolders = ({ inDataPath }) => {
    return fs.readdirSync(inDataPath).filter(function (file) {
        return fs.statSync(inDataPath + '/' + file).isDirectory();
    });
};

let FolderIsEmpty = ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    let LocalFromCommonCheck = ForExistence({ inDataPK });

    if (LocalFromCommonCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonCheck.KReason;
    };

    LocalReturnData.ReportsPath = LocalFromCommonCheck.ReportsPath;

    let LocalFoldersArray = LocalReturnFolders({ inDataPath: LocalReturnData.ReportsPath });

    if (LocalFoldersArray.length === 0) {
        LocalReturnData.KTF = true;

        return LocalReturnData;
    };

    return LocalReturnData;
};

//console.log("ForExistence : ", ForExistence({ inDataPK: 16 }));

module.exports = { ForExistence, FolderIsEmpty };
