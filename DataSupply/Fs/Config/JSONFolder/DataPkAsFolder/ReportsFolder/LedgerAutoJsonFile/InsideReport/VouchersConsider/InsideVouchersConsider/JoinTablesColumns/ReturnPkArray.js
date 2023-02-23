let CommonFromFromJson = require("../../../../PullDataFromFile/FromJson");

let StartFunc = async ({ inDataPK, ReportName, VoucherConsiderPK }) => {
    let jvarLocalDataPK = inDataPK;
    let localReportName = ReportName;
    let LocalReturnData = { KTF: false };
    let localVoucherConsiderPK = VoucherConsiderPK;

    let ComonFromJsonData = await CommonFromFromJson.StartFunc({ inDataPK: jvarLocalDataPK });

    if (ComonFromJsonData.KTF === false) {
        LocalReturnData.KReason = ComonFromJsonData.KReason;
        return await LocalReturnData;
    };

    let jvarLocalNewData = JSON.parse(JSON.stringify(ComonFromJsonData.JsonData));

    if (localReportName in jvarLocalNewData) {
        let LocalVouchersConsiderFind = jvarLocalNewData[localReportName].VouchersConsider.find(e => e.pk === parseInt(localVoucherConsiderPK));
     //   console.log("ssssssssss : ", localReportName, localVoucherConsiderPK, LocalVouchersConsiderFind);
        LocalReturnData.DataAsArray = LocalVouchersConsiderFind.JoinTablesColumns.map(e => e.pk);
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