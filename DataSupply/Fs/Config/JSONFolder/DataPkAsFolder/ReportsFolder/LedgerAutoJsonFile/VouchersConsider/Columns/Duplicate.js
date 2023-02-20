let CommonFromFromJson = require("../../PullDataFromFile/FromJson");
let CommonFromMaxPk = require("./MaxPk")

let StartFunc = async ({ inDataPK, ReportName, VoucherConsiderPK, ColumnPk }) => {
    let LocalinDataPK = inDataPK;
    let localReportName = ReportName;
    let localVoucherConsiderPK = VoucherConsiderPK;
    let localColumnPk = ColumnPk;
    let localData;

    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalLedgerJsonDate = await CommonFromFromJson.StartFunc({ inDataPK: LocalinDataPK });
    if (LocalLedgerJsonDate.KTF === false) {
        LocalReturnData.KReason = LocalLedgerJsonDate.KReason;
        return await LocalReturnData;
    };
    localData = LocalLedgerJsonDate.JsonData;

    if (localReportName in localData) {
        if ("VouchersConsider" in localData[localReportName]) {
            // console.log("kkk",localData[localReportName].VouchersConsider);
            let jVarLocalFind = localData[localReportName].VouchersConsider.find(e => e.pk === parseInt(localVoucherConsiderPK));
            let jVarLocalColumnPKFind = jVarLocalFind.Columns.find(e => e.pk === parseInt(localColumnPk));

            jvarLocalFindVouchersColumn = JSON.parse(JSON.stringify(jVarLocalColumnPKFind));

            let LocalFromMax = await CommonFromMaxPk.StartFunc({
                inDataPK: LocalinDataPK,
                ReportName: localReportName,

            });
        };

    };




    return await LocalReturnData;
};
let MockFunc = async () => {
    await StartFunc({
        inDataPK: 1022,
        ReportName: "Purchases",
        VoucherConsiderPK: "30",
        ColumnPk: "1"
    }).then((PromiseData) => {
        console.log("PromiseData", PromiseData);
    })
};
MockFunc();


module.exports = { StartFunc };