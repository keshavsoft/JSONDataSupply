let fs = require("fs");
let CommonPullDataFromFile = require("../PullDataFromFile/FromJson");

let StartFunc = ({ inDataPK, ReportName }) => {
    let LocalinDataPK = inDataPK;
    let LocalReportName = ReportName;

    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let CommonFromFolderCheck = CommonPullDataFromFile.StartFuncNoSync({ inDataPK: LocalinDataPK });

    LocalReturnData = { ...CommonFromFolderCheck };
    LocalReturnData.KTF = false;

    if (CommonFromFolderCheck.KTF === false) {
        return LocalReturnData;
    };

    if (LocalReportName in CommonFromFolderCheck.JsonData === false) {
        LocalReturnData.KReason = "Key not found...";

        return LocalReturnData;
    };

    LocalReturnData.KTF = true;

    return LocalReturnData;

};

module.exports = { StartFunc };
