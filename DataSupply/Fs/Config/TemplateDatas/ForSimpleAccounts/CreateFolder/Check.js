let fs = require("fs");
//let CommonFromTemplateData = require("../BasicForMsSql/Check");
let CommonCheckFolder = require("../../CheckFolder");

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

// let LocalFromForExistence = ForExistence();
// console.log("LocalFromForExistence  ", LocalFromForExistence);

module.exports = { ForExistence };
