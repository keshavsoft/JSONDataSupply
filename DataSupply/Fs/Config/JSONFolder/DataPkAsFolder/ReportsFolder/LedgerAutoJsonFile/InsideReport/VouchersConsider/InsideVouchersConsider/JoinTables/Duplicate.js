let CommonFromFromJson = require("../../../../PullDataFromFile/FromJson");
let CommonFromToJson = require("../../../../PushDataFromFile/FromJson");
let CommonFromMaxPk = require("./ReturnPkArray");
let CommonFindKey = require("./FindKey");

let StartFunc = async ({ inDataPK, inReportName, inVouchersConsiderPK, JoinTablesColumnsPK }) => {
      console.log("----:",inDataPK, inReportName, inVouchersConsiderPK, JoinTablesColumnsPK );
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

            if ("JoinTables" in LocalVouchersConsiderFind) {
                let localJoinTablesColumnsFind = LocalVouchersConsiderFind.JoinTables.find(p => p);

                let LocalFromMax = await CommonFromMaxPk.StartFunc({
                    inDataPK: localinDataPK,
                    ReportName: localinReportName,
                    VoucherConsiderPK: localinVouchersConsiderPK
                });

                if (LocalFromMax.KTF === false) {
                    LocalReturnData.KReason = LocalFromMax.KReason;
                    return await LocalReturnData;
                };

                let LocalCommonFindKey = await CommonFindKey.StartFunc({
                    inDataPK: localinDataPK,
                    ReportName: localinReportName,
                    VoucherConsiderPK: localinVouchersConsiderPK,
                    inJoinTablePk: localJoinTablesColumnsPK
                });


                if (LocalCommonFindKey.KTF === false) {
                    LocalReturnData.KReason = LocalCommonFindKey.KReason;
                    return await LocalReturnData;
                };


                // let localNewData =

                let MaxKey = LocalFromMax.DataAsMaxString;

                let localNewObject = {};

                localNewObject[MaxKey] = LocalCommonFindKey.FindValue;

                console.log("localNewObject : ", localNewObject);

                LocalVouchersConsiderFind.JoinTables.push(localNewObject);

                let jvarLocalPushData = await CommonFromToJson.StartFunc({
                    inOriginalData: localCommonJsonData.JsonData,
                    inDataToUpdate: localLedgerAutoJsonData,
                    inDataPK: localinDataPK
                });

                if (jvarLocalPushData.KTF) {
                    LocalReturnData.KTF = true;

                    return await LocalReturnData;
                };
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
        JoinTablesColumnsPK: "JT1"

    }).then((promiseData) => {

    });
};

// mockFunc();

module.exports = { StartFunc };