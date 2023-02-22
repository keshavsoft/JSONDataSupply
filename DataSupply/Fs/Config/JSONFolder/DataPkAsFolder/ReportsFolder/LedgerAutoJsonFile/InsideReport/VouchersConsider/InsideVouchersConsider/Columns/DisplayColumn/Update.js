let _ = require("lodash");

let CommonFromFromJson = require("../../../../../PullDataFromFile/FromJson");
let CommonFromToJson = require("../../../../../PushDataFromFile/FromJson");


let StartFunc = async ({ inDataPK, ReportName, voucherconsiderpk, columnpk, BodyAsJson }) => {
    const LocalDataToUpdate = (({ DisplayColumn, TransformType, DefaultValue, ConsiderJoinTable, TransformTF }) => ({ DisplayColumn, TransformType, DefaultValue, ConsiderJoinTable, TransformTF }))(BodyAsJson);
    let LocalinDataPK = inDataPK;
    let localReportName = ReportName;
    let localvoucherconsiderpk = parseInt(voucherconsiderpk);
    let localcolumnpk = columnpk;

    let LocalReturnData = { KTF: false };

    let LocalLedgerJsonDate = await CommonFromFromJson.StartFunc({ inDataPK: LocalinDataPK });
    if (LocalLedgerJsonDate.KTF === false) {
        LocalReturnData.KReason = LocalLedgerJsonDate.KReason;
        return await LocalReturnData;
    };

    let localData = LocalLedgerJsonDate.JsonData;

    if (localReportName in localData) {
        if ("VouchersConsider" in localData[localReportName]) {
            let LocalFilterObject = {};
            LocalFilterObject.pk = localvoucherconsiderpk;

            LocalFindColumnObject = _.find(localData[localReportName].VouchersConsider, LocalFilterObject);
            if ("Columns" in LocalFindColumnObject) {
                console.log("LocalFindColumnObject", LocalFindColumnObject);

            };

        };

    };


    return await LocalReturnData;
};

module.exports = { StartFunc };