let _ = require("lodash");

let CommonCheckReportKey = require("../../CheckReportKey");

let StartFunc = ({ DataPK, VoucherPk, ReportName }) => {
    let LocalinDataPK = DataPK;
    let LocalReportName = ReportName;
    let LocalVouchersConsiderPk = parseInt(VoucherPk);

    let LocalFromPullData = CommonCheckReportKey.StartFunc({
        inDataPK: LocalinDataPK,
        ReportName: LocalReportName
    });

    let LocalReturnObject = { ...LocalFromPullData };
    LocalReturnObject.KTF = false

    if (LocalFromPullData.KTF === false) {
        return LocalReturnObject;
    };

    if ("VouchersConsider" in LocalReturnObject.JsonData[ReportName] === false) {
        LocalReturnObject.KReason = "VouchersConsider not found...";
        return LocalReturnObject;
    };

    if (Array.isArray(LocalReturnObject.JsonData[ReportName].VouchersConsider) === false) {
        LocalReturnObject.KReason = "VouchersConsider is not an Array...";
        return LocalReturnObject;
    };

    if ("VouchersConsider" in LocalReturnObject.JsonData[ReportName] === false) {
        LocalReturnObject.KReason = "VouchersConsider not found...";
        return LocalReturnObject;
    };

    let LocalFilterObject = {};
    LocalFilterObject.pk = LocalVouchersConsiderPk;

    LocalFindColumnObject = _.find(LocalReturnObject.JsonData[LocalReportName].VouchersConsider, LocalFilterObject);

    if (LocalFindColumnObject === undefined) {
        LocalReturnObject.KReason = "VouchersConsiderPK not found...";
        return LocalReturnObject;
    };

    LocalReturnObject.KTF = true;
    return LocalReturnObject;
};

module.exports = {
    StartFunc
};