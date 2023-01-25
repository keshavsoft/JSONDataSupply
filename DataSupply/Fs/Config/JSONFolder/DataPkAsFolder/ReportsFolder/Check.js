let fs = require("fs");
let CommonAbsolutePath = require("../Check");

let ForExistence = ({ inDataPK }) => {
    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFolderName = "Reports";

    let CommomFromFolderCheck = CommonAbsolutePath.ForExistence({ inDataPK: LocalinDataPK });
    if (CommomFromFolderCheck === false) {
        LocalReturnData.KReason = CommomFromFolderCheck.KReason;
        return LocalReturnData;

    }
    LocalReturnData.ReportsPath = `${CommomFromFolderCheck.DataPKPath}/${LocalFolderName}`;

    try {
        if (fs.statSync(LocalReturnData.ReportsPath).isDirectory()) {
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

let MockFunc = () => {
    let CheckData = ForExistence({ inDataPK: 1024 });
    console.log("CheckData---", CheckData);
};
// MockFunc();

//console.log("ForExistence : ", ForExistence({ inDataPK: 16 }));

module.exports = { ForExistence, FolderIsEmpty };
