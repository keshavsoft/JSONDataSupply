let CommonFromFromJson = require("../../../../PullDataFromFile/FromJson");
let CommonFromToJson = require("../../../../PushDataFromFile/FromJson");
let CommonFromMaxPk = require("./MaxPk");

let StartFunc = async ({ inDataPK, inReportName, inVouchersConsiderPK, JoinTablesColumnsPK }) => {
    let localinDataPK = inDataPK;
    let localinReportName = inReportName;
    let localinVouchersConsiderPK = inVouchersConsiderPK;
    let localJoinTablesColumnsPK = JoinTablesColumnsPK;

    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let localCommonJsonData = await CommonFromFromJson.StartFunc({ inDataPK: localinDataPK });

    if (localCommonJsonData.KTF === false) {
        LocalReturnData.KReason = localCommonJsonData.KReason;
        return await LocalReturnData;
    };
    let localLedgerAutoJsonData = localCommonJsonData.JsonData;

    if (localinReportName in localLedgerAutoJsonData) {
        if ("VouchersConsider" in localLedgerAutoJsonData[localinReportName]) {
            let LocalVouchersConsiderFind = localLedgerAutoJsonData[localinReportName].VouchersConsider.find(e => e.pk === parseInt(localinVouchersConsiderPK));

            if ("JoinTablesColumns" in LocalVouchersConsiderFind) {

                let localJoinTablesColumnsFind = LocalVouchersConsiderFind.JoinTablesColumns.find(p => p.pk === parseInt(localJoinTablesColumnsPK));
                let localJoinTablesColumns = JSON.parse(JSON.stringify(localJoinTablesColumnsFind));

                let LocalFromMax = await CommonFromMaxPk.StartFunc({
                    inDataPK: localinDataPK,
                    ReportName: localinReportName,
                    VoucherConsiderPK: localinVouchersConsiderPK
                });
                if (LocalFromMax.KTF === false) {
                    LocalReturnData.KReason = LocalFromMax.KReason;
                    return await LocalReturnData;
                };

                localJoinTablesColumns.pk = LocalFromMax.MaxPk + 1;

                LocalVouchersConsiderFind.JoinTablesColumns.push(localJoinTablesColumns);

                let jvarLocalPushData = await CommonFromToJson.StartFunc({
                    inOriginalData: localCommonJsonData.JsonData,
                    inDataToUpdate: localLedgerAutoJsonData,
                    inDataPK: localinDataPK
                });

                if (jvarLocalPushData.KTF) {
                    LocalReturnData.KTF = true
                };
                return await LocalReturnData;
            };
        };
    };
    return await LocalReturnData;

};

let mockFunc = () => {
    StartFunc({
        inDataPK: 1022,
        inReportName: "Purchases",
        inVouchersConsiderPK: 30,
        JoinTablesColumnsPK: 30

    }).then((promiseData) => {

    });
};
// mockFunc();

module.exports = { StartFunc };