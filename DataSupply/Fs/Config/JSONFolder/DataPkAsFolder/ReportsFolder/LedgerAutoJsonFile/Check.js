let fs = require("fs");
let CommonAbsolutePath = require("../Check");

let StartFunc = ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalJsonFile = "LedgerAuto.json";

    let CommonFromFolderCheck = CommonAbsolutePath.ForExistence({ inDataPK });

    if (CommonFromFolderCheck.KTF === false) {
        return LocalReturnData;
    };

    LocalReturnData.ReportFilePath = `${CommonFromFolderCheck.ReportsPath}/${LocalJsonFile}`;

    try {
        if (fs.existsSync(LocalReturnData.ReportFilePath)) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "File not found!";
        };
    } catch (error) {
        LocalReturnData.KReason = error;
    };

    return LocalReturnData;

};

module.exports = { StartFunc };
