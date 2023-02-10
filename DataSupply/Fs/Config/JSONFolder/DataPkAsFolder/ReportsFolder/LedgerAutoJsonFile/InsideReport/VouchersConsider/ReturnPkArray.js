let CommonFromFromJson = require("../../PullDataFromFile/FromJson");

let StartFunc = async ({ inDataPK, ReportName }) => {
    let jvarLocalDataPK = inDataPK;
    let jvarLocalReportName = ReportName;
    let LocalReturnData = { KTF: false };
    let ComonFromJsonData = await CommonFromFromJson.StartFunc({ inDataPK: jvarLocalDataPK });

    if (ComonFromJsonData.KTF === false) {
        LocalReturnData.KReason = ComonFromJsonData.KReason;
        return await LocalReturnData;
    };

    let jvarLocalNewData = JSON.parse(JSON.stringify(ComonFromJsonData.JsonData));

    // console.log("hhhhhhhhh-----------", jvarLocalNewData[jvarLocalReportName].VouchersConsider);

    if (jvarLocalReportName in jvarLocalNewData) {
        LocalReturnData.DataAsArray = jvarLocalNewData[jvarLocalReportName].VouchersConsider.map(e => e.pk);
        LocalReturnData.KTF = true;
    };

    return await LocalReturnData;
};

let MockFunc = () => {
    let findData = StartFunc({ inDataPK: "1022", ReportName: "Sales", inVoucherConsiderpk: "30" }).then((promseData) => {
        console.log("promseData--", promseData);
    });
};

module.exports = { StartFunc };