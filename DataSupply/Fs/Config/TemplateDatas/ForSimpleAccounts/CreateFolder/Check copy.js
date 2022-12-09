let fs = require("fs");
let CommonFromTemplateData = require("../BasicForMsSql/Check");

let ForExistence = () => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };
    let LocalFromCommonFromTemplateData = CommonFromTemplateData.ForExistence();
    let LocalDataPathName = "ForSimpleAccounts";

    LocalReturnData.TemplateDataDirPath = LocalFromCommonFromTemplateData.TemplateDataDirPath;
    
    if (LocalFromCommonFromTemplateData.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromTemplateData.KReason;
        return LocalReturnData;
    };

    LocalReturnData.CreateFolderDirPath = `${LocalFromCommonFromTemplateData.TemplateDataDirPath}/${LocalDataPathName}`

    try {
        if (fs.statSync(LocalReturnData.CreateFolderDirPath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "File not found!";
        }
    } catch (error) {
        LocalReturnData.KReason = error;
    };

    return LocalReturnData;
};

module.exports = { ForExistence };
