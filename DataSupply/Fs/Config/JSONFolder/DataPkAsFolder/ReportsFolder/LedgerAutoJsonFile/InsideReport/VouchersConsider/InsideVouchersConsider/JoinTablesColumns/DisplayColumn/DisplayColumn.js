let CommonFromFromJson = require("../../../../../PullDataFromFile/FromJson");
let CommonFromToJson = require("../../../../../PushDataFromFile/FromJson");

let StartFunc = async ({ inDataPK, inReportName, inVouchersConsiderPK, JoinTablesColumnsPK, BodyAsJson }) => {
    const LocalDataToUpdate = (({ Name, DisplayColumn, TransformType, JoinTable, ConsiderJoinTable }) => ({ Name, DisplayColumn, TransformType, JoinTable, ConsiderJoinTable }))(BodyAsJson);

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
                console.log("ggggggggggggg", localJoinTablesColumnsFind.Name, LocalDataToUpdate.Name);
                localJoinTablesColumnsFind.Name = LocalDataToUpdate.Name;
                localJoinTablesColumnsFind.DisplayColumn = LocalDataToUpdate.DisplayColumn;
                localJoinTablesColumnsFind.TransformType = LocalDataToUpdate.TransformType;
                localJoinTablesColumnsFind.JoinTable = LocalDataToUpdate.JoinTable;
                localJoinTablesColumnsFind.ConsiderJoinTable = LocalDataToUpdate.ConsiderJoinTable;


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
        JoinTablesColumnsPK: 30,
        BodyAsJson: { DisplayColumn: "AccountNameeeeeeeeeeeeeeeeee" }


    }).then((promiseData) => {

    });
};
// mockFunc();

module.exports = { StartFunc };