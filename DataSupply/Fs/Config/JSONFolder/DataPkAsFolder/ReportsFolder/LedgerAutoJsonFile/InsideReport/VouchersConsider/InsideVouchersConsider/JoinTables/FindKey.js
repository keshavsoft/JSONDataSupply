let CommonFromFromJson = require("../../../../PullDataFromFile/FromJson");

let StartFunc = async ({ inDataPK, ReportName, VoucherConsiderPK, inJoinTablePk }) => {
    let jvarLocalDataPK = inDataPK;
    let localReportName = ReportName;
    let LocalReturnData = { KTF: false };
    let localVoucherConsiderPK = VoucherConsiderPK;
    let LocalJoinTablePk = inJoinTablePk;

    let ComonFromJsonData = await CommonFromFromJson.StartFunc({ inDataPK: jvarLocalDataPK });

    if (ComonFromJsonData.KTF === false) {
        LocalReturnData.KReason = ComonFromJsonData.KReason;
        return await LocalReturnData;
    };

    let jvarLocalNewData = JSON.parse(JSON.stringify(ComonFromJsonData.JsonData));

    if (localReportName in jvarLocalNewData) {
        let LocalVouchersConsiderFind = jvarLocalNewData[localReportName].VouchersConsider.find(e => e.pk === parseInt(localVoucherConsiderPK));
        if ("JoinTables" in LocalVouchersConsiderFind) {
            let LocalJoinTablesFind = LocalVouchersConsiderFind.JoinTables.find(e => Object.keys(e)[0] === LocalJoinTablePk);
            //  const max = LocalJoinTablesFind.reduce((a, b) => { return Math.max(a, b) });
                       console.log("max-------:", LocalJoinTablesFind);


            LocalReturnData.FindValue = Object.values(LocalJoinTablesFind)[0];
            LocalReturnData.KTF = true;
        };
    };

    return await LocalReturnData;
};

let MockFunc = () => {
    let findData = StartFunc({ inDataPK: "1022", ReportName: "StockBook", VoucherConsiderPK: 20,inJoinTablePk:"JT1" }).then((promseData) => {
        console.log("promseData--", promseData);
    });
};
// MockFunc();

module.exports = { StartFunc };