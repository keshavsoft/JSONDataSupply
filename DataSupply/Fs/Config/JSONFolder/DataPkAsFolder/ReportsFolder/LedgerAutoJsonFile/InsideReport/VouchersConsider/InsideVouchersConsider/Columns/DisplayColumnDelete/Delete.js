let _ = require("lodash");

let CommonFromFromJson = require("../../../../../PullDataFromFile/FromJson");
let CommonFromPushData = require("../../../../../PushDataFromFile/FromJson");

let CommonMock = require("../../../.././../../../../../../../MockAllow.json");


let StartFunc = async ({ DataPK, ReportName, Voucherpk, Columnpk }) => {
    let LocalinDataPK = DataPK;
    let localReportName = ReportName;
    let localvoucherconsiderpk = parseInt(Voucherpk);
    let localcolumnpk = parseInt(Columnpk);

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

                const filteredPeople = LocalFindColumnObject.Columns.filter((item) => item.pk !== localcolumnpk);
                LocalFindColumnObject.Columns = filteredPeople

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
if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'SSVV') {
        let LocalMockData = require('./Delete.json');

        StartFunc({
            DataPK: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);

        });
    };
};

module.exports = { StartFunc };