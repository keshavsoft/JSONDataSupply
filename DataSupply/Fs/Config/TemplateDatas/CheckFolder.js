let fs = require("fs");
let CommonAbsolutePath = require("../../DataPath");

let ForExistence = () => {
    let LocalReturnData = { KTF: false, TemplateDataDirPath: "", CreatedLog: {} };
    let LocalDataPathName = "TemplateDatas";

    let GlobalDataPath = CommonAbsolutePath.ReturnAbsolutePathOfPresentApp({});
    LocalReturnData.TemplateDataDirPath = `${GlobalDataPath}\\${LocalDataPathName}`

        try {
            if (fs.statSync(LocalReturnData.TemplateDataDirPath).isDirectory()) {
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
