let CommonFrom = require("../PullDataFromFile/FromJson");

let StartFunc = async ({ inDataPK }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let CommonFromFromJson = await CommonFrom.StartFunc({ inDataPK });

    if (CommonFromFromJson.KTF === false) {
        LocalReturnData.KReason = CommonFromFromJson.KReason;
        return await LocalReturnData;
    };
    LocalReturnData.JsonData = await LocalBuildJsonData({ inJsonData: CommonFromFromJson.JsonData });
    LocalReturnData.KTF = true;
    // LocalReturnData.JsonData = CommonFromFromJson.JsonData;

    return await LocalReturnData;
};
let LocalBuildJsonData = async ({ inJsonData }) => {
    let LocalReturnObject = {};
    LocalReturnObject.Reports = {};
    Object.entries(inJsonData).forEach(
        ([key, value]) => {
            LocalReturnObject.Reports[key] = {};
            LocalReturnObject.Reports[key].VouchersConsider = {};

            value.VouchersConsider.forEach(element => {
                //   LocalReturnObject.Reports[key].VouchersConsider[element.pk] = { Active: element.Active };
                LocalReturnObject.Reports[key].VouchersConsider[element.pk] = {
                    FolderName: element.FolderName,
                    FileName: element.FileName,
                    Active: element.Active
                };

                //  LocalReturnObject.Reports[key].VouchersConsider[element.pk] = { ...element };
            });
        }
    );
    return await LocalReturnObject;


};

let MockFunc = async () => {
    await StartFunc({ inDataPK: "1022" });
};
// MockFunc();

module.exports = { StartFunc };