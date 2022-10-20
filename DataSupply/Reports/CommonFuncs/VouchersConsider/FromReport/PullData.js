//let Common;
let GlobalReportsPullDataOnly = require("../../PullDataOnly");

let LocalStartFunc = async ({ inFromReport, inDataPK }) => {
    let LocalReturnObject = { KTF: false, KReason: "" };
    let LocalFromReport = inFromReport;
    let LocalReportName;
    let LocalFromPullDataOnly;
    let LocalDataPK = inDataPK;

    if (LocalFromReport.KTF) {
        if (("ReportName" in LocalFromReport) === false) {
            LocalReturnObject.KReason = "ReportName not found in FromReport";
            return await LocalReturnObject;
        };

        LocalReportName = LocalFromReport.ReportName;

        // LocalFromPullDataOnly = await GlobalReportsPullDataOnly.FromItemNameWithOutFilters({
        //     inLedgerAutoJsonWithItemName: LocalReportName,
        //     inUserPK: LocalDataPK
        // });

        console.log("rrrrrrrrrrr : ", LocalFromPullDataOnly);
    } else {

    };

    return await LocalReturnObject;
};

module.exports = { StartFunc: LocalStartFunc }