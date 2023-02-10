let CommonFrom = require("../PullDataFromFile/FromJson");

let StartFunc = async ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let CommonFromFromJson = await CommonFrom.StartFunc({ inDataPK });

    if (CommonFromFromJson.KTF === false) {
        LocalReturnData.KReason = CommonFromFromJson.KReason;
        return await LocalReturnData;
    };
    LocalReturnData.JsonObject = CommonFromFromJson.JsonData;

    LocalObjectToArray = Object.keys(CommonFromFromJson.JsonData);
    LocalObject = LocalObjectToArray.map(x => {
        return { ReportName: x }
    });
    LocalReturnData.JsonObject = LocalObject;
    LocalReturnData.KTF = true;

    return await LocalReturnData;
};
let MockFunc = async () => {
    StartFunc({ inDataPK: "1022" });
};
// MockFunc();

module.exports = { StartFunc };