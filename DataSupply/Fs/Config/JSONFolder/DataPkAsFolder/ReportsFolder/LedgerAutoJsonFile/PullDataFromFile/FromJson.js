let fs = require("fs");
let CommonFromCheck = require("../Check");

let StartFunc = async ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let CommonFromFileCheck = CommonFromCheck.StartFunc({ inDataPK });

    if (CommonFromFileCheck.KTF === false) {
        LocalReturnData.KReason = CommonFromFileCheck.KReason;
        return await LocalReturnData;
    };
    if (("ReportFilePath" in CommonFromFileCheck) === false) {
        LocalReturnData.KReason = "ReportFilePath is Not Found..!";
        return await LocalReturnData;

    };

    let LocalDataFromJSON = await fs.readFileSync(CommonFromFileCheck.ReportFilePath);
    LocalReturnData.JsonData = JSON.parse(LocalDataFromJSON);
    LocalReturnData.KTF = true;

    return await LocalReturnData;
};

let StartFuncNoSync = ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let CommonFromFileCheck = CommonFromCheck.StartFunc({ inDataPK });

    LocalReturnData = { ...CommonFromFileCheck };
    LocalReturnData.KTF = false;

    if (CommonFromFileCheck.KTF === false) {
        return LocalReturnData;
    };

    let LocalDataFromJSON = fs.readFileSync(CommonFromFileCheck.ReportFilePath);
    LocalReturnData.JsonData = JSON.parse(LocalDataFromJSON);
    LocalReturnData.KTF = true;

    return LocalReturnData;
};

module.exports = { StartFunc, StartFuncNoSync }