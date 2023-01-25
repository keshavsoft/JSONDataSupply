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

let MockFunc = () => {
    StartFunc({
        inDataPK: 1024
    }).then((PromiseData) => {
        console.log("PromiseData--", Object.keys(PromiseData));
    })
};
// MockFunc();


module.exports = { StartFunc }