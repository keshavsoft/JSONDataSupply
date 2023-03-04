let CommonFromFromJson = require("../../../../PullDataFromFile/FromJson");
let CommonFromToJson = require("../../../../PushDataFromFile/FromJson");
let CommonFromMaxPk = require("./ReturnPkArray");

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

            if ("JoinTables" in LocalVouchersConsiderFind) {
                let localJoinTablesColumnsFind = LocalVouchersConsiderFind.JoinTables.find(p => p);

                if (localJoinTablesColumnsPK in localJoinTablesColumnsFind) {
                    let localJoinTablesColumns = JSON.parse(JSON.stringify(localJoinTablesColumnsFind[localJoinTablesColumnsPK]));

                    let LocalFromMax = await CommonFromMaxPk.StartFunc({
                        inDataPK: localinDataPK,
                        ReportName: localinReportName,
                        VoucherConsiderPK: localinVouchersConsiderPK
                    });

                    if (LocalFromMax.KTF === false) {
                        LocalReturnData.KReason = LocalFromMax.KReason;
                        return await LocalReturnData;
                    };

                    let MaxKey = LocalFromMax.DataAsMaxString;
                    let localAdditionKey = parseInt(MaxKey) + 1
                    let localMaxString = `JT${localAdditionKey}`
                    
                    console.log("localMaxString", localMaxString);

                    localJoinTablesColumns.localJoinTablesColumnsPK = localMaxString;

                    // localLedgerAutoJsonData[localinReportName][LocalVouchersConsiderFind].JoinTables.push(localJoinTablesColumns);

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