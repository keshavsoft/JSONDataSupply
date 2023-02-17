let CommonFromFromJson = require("../PullDataFromFile/FromJson");

let StartFunc = async ({ inDataPK }) => {
    let localinDataPK = inDataPK;

    let LocalReturnData = { KTF: false };


    let CommonFromReportsData = await CommonFromFromJson.StartFunc({ inDataPK: localinDataPK });
    // console.log("CommonFromReportsData", CommonFromReportsData);
    if (CommonFromReportsData.KTF === false) {
        LocalReturnData.KReason = CommonFromReportsData.KReason;
        return await LocalReturnData;
    };

    LocalReturnData.JsonData = LocalBuildJsonData({ inJsonData: CommonFromReportsData.JsonData });
    LocalReturnData.KTF = true;
    // console.log("LocalReturnData", LocalReturnData.JsonData.Reports);

    return await LocalReturnData;
};

let LocalBuildJsonData = ({ inJsonData }) => {
    let LocalReturnObject = {};
    LocalReturnObject.Reports = {};

    Object.entries(inJsonData).forEach(
        ([FileKey, FileValue]) => {
            // console.log("Local",LocalReturnObject.Reports[FileKey] );
            LocalReturnObject.Reports[FileKey] = {
                DisplayName: FileValue.TableColumns.DisplayName
            }
        });
    return LocalReturnObject;
};

let MockFunc = () => {
    StartFunc({
        inDataPK: 1022
    }).then((PromiseData) => {
        console.log("PromiseData--", PromiseData.JsonData);
    })
};
// MockFunc();


module.exports = { StartFunc };