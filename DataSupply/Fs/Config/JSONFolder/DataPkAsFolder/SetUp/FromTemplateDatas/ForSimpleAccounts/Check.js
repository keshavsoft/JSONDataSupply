let fs = require("fs");
//let CommonFromTemplateData = require("../BasicForMsSql/Check");
let CommonCheckFolder = require("../CheckFolder");

let ForExistence = () => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFromForExistence = CommonCheckFolder.ForExistence();
    let LocalDataPathName = "ForSimpleAccounts";

    if (LocalFromForExistence.KTF === false) {
        LocalReturnData.KReason = LocalFromForExistence.KReason;
        return LocalReturnData;
    };

    LocalReturnData.TemplateDataPath = `${LocalFromForExistence.TemplateDataDirPath}/${LocalDataPathName}`;

    try {
        if (fs.statSync(LocalReturnData.TemplateDataPath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "File not found!";
        }
    } catch (error) {
        LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

let ReturnDirectories = () => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFromCommonFromCheck = ForExistence();

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    LocalReturnData.TemplateDataPath = LocalFromCommonFromCheck.TemplateDataPath;

    LocalReturnData.DirectoriesArray = fs.readdirSync(LocalFromCommonFromCheck.TemplateDataPath).filter(function (file) {
        return fs.statSync(LocalFromCommonFromCheck.TemplateDataPath + '/' + file).isDirectory();
    });

    LocalReturnData.FirmDetailsJsonFilePath = `${LocalFromCommonFromCheck.TemplateDataPath}/FirmDetails.json`;
    LocalReturnData.FirmDetailsJsonFileIsPresent = fs.existsSync(`${LocalFromCommonFromCheck.TemplateDataPath}/FirmDetails.json`)

    LocalReturnData.KTF = true;

    return LocalReturnData;
};

// let LocalFromForExistence = ForExistence();
// console.log("LocalFromForExistence  ", LocalFromForExistence);

module.exports = { ForExistence, ReturnDirectories };
