let _ = require("lodash");

let CommonFromFromJson = require("../../../../../PullDataFromFile/FromJson");
let CommonFromPushData = require("../../../../../PushDataFromFile/FromJson");


let StartFunc = async ({ inDataPK, ReportName, voucherconsiderpk, columnpk, BodyAsJson }) => {
    const LocalDataToUpdate = (({ DefaultValue }) => ({ DefaultValue }))(BodyAsJson);
    let LocalinDataPK = inDataPK;
    let localReportName = ReportName;
    let localvoucherconsiderpk = parseInt(voucherconsiderpk);
    let localcolumnpk = parseInt(columnpk);

    let LocalReturnData = { KTF: false };

    let LocalLedgerJsonDate = await CommonFromFromJson.StartFunc({ inDataPK: LocalinDataPK });
    if (LocalLedgerJsonDate.KTF === false) {
        LocalReturnData.KReason = LocalLedgerJsonDate.KReason;
        return await LocalReturnData;
    };
    let LocalFromUpdate;
    let localData = LocalLedgerJsonDate.JsonData;

    if (localReportName in localData) {
        if ("VouchersConsider" in localData[localReportName]) {
            let LocalFilterObject = {};
            LocalFilterObject.pk = localvoucherconsiderpk;
            let LocalFindColumnObject;

            LocalFindColumnObject = _.find(localData[localReportName].VouchersConsider, LocalFilterObject);
            if ("Columns" in LocalFindColumnObject) {
                let localFindColumn = {};
                localFindColumn.pk = localcolumnpk
                let LocalColumnObject = _.find(LocalFindColumnObject.Columns, localFindColumn);

                LocalColumnObject.DefaultValue = LocalDataToUpdate.DefaultValue;


                LocalFromUpdate = await CommonFromPushData.StartFunc({
                    inDataPK: LocalinDataPK,
                    inDataToUpdate: localData,
                    inOriginalData: LocalLedgerJsonDate.JsonData
                });

                if (LocalFromUpdate.KTF) {
                    LocalReturnData.KTF = true;
                };

                return await LocalReturnData;
            };

        };

    };


    return await LocalReturnData;
};

module.exports = { StartFunc };