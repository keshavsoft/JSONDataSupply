let CommonFromReturnPkArray = require("./ReturnPkArray");

let StartFunc = async ({ inDataPK, ReportName }) => {
    let jvarLocalDataPK = inDataPK;
    let jvarLocalReportName = ReportName;
    let LocalReturnData = { KTF: false };

    let LocalFromCommonFromReturnPkArray = await CommonFromReturnPkArray.StartFunc({
        inDataPK: jvarLocalDataPK,
        ReportName: jvarLocalReportName
    });

    if (LocalFromCommonFromReturnPkArray.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromReturnPkArray.KReason;
        return await LocalReturnData;
    };

    LocalReturnData.MaxPk = LocalFromCommonFromReturnPkArray.DataAsArray.reduce((a, b) => { return Math.max(a, b) });
    LocalReturnData.KTF = true;

    return await LocalReturnData;
};

let MockFunc = () => {
    let findData = StartFunc({ inDataPK: "1022", ReportName: "Sales", inVoucherConsiderpk: "30" }).then((promseData) => {
        console.log("promseData--", promseData);
    });
};

// MockFunc();

module.exports = { StartFunc };