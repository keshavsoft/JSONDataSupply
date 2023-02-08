let CommonFrom = require("../PullDataFromFile/FromJson");

let StartFunc = async ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let CommonFromFromJson = await CommonFrom.StartFunc({ inDataPK });

    if (CommonFromFromJson.KTF === false) {
        LocalReturnData.KReason = CommonFromFromJson.KReason;
        return await LocalReturnData;
    };
    LocalReturnData.KTF = true;
    LocalReturnData.JsonData = CommonFromFromJson.JsonData;

    return await LocalReturnData;
};
let MockFunc = async () => {
    StartFunc({ inDataPK: "1024" });
};
// MockFunc();

module.exports = { StartFunc };