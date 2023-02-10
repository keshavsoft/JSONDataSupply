let CommonFromFromJson = require("../../PullDataFromFile/FromJson");
let CommonFromToJson = require("../../PushDataFromFile/FromJson");


let StartFunc = async ({ inDataPK, ReportName, CloneName }) => {
    let jvarLocalDataPK = inDataPK;
    let jvarLocalReportName = ReportName;
    let jvarLocalCloneName = CloneName;
    let LocalReturnData = { KTF: false };


    let ComonFromJsonData = await CommonFromFromJson.StartFunc({ inDataPK: jvarLocalDataPK });

    if (ComonFromJsonData.KTF === false) {
        LocalReturnData.KReason = ComonFromJsonData.KReason;
        return await LocalReturnData;
    };

    let jvarLocalNewData = JSON.parse(JSON.stringify(ComonFromJsonData.JsonData));

    if (jvarLocalReportName in jvarLocalNewData) {
        if (jvarLocalCloneName in jvarLocalNewData === false) {

            let jvarLocalReports = JSON.parse(JSON.stringify(jvarLocalNewData[jvarLocalReportName]));
            jvarLocalNewData[jvarLocalCloneName] = jvarLocalReports;

            let jvarLocalPushData = await CommonFromToJson.StartFunc({
                inOriginalData: ComonFromJsonData.JsonData,
                inDataToUpdate: jvarLocalNewData,
                inDataPK: jvarLocalDataPK
            });
            if (jvarLocalPushData.KTF) {
                LocalReturnData.KTF = true;

            };
            return await LocalReturnData;

        };

    };
    return await LocalReturnData;

};
let MockFunc = () => {
    StartFunc({ inDataPK, ReportName, CloneName })
};
// MockFunc();

module.exports = { StartFunc };