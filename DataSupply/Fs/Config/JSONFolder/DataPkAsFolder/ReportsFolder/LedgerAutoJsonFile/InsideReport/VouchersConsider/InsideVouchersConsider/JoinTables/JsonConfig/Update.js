let CommonFromFromJson = require("../../../../../PullDataFromFile/FromJson");
let CommonFromToJson = require("../../../../../PushDataFromFile/FromJson");

let StartFunc = async ({ inDataPK, inReportName, inVouchersConsiderPK, JoinTablesColumnsPK, BodyAsJson }) => {
    const LocalDataToUpdate = (({ UserFolderName, inFolderName, inJsonFileName }) => ({ UserFolderName, inFolderName, inJsonFileName }))(BodyAsJson);

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

                LocalVouchersConsiderFind.JoinTables.forEach(element => {
                    if (localJoinTablesColumnsPK in element) {
                        element[localJoinTablesColumnsPK].JsonConfig.UserFolderName = LocalDataToUpdate.UserFolderName;
                        element[localJoinTablesColumnsPK].JsonConfig.inFolderName = LocalDataToUpdate.inFolderName;
                        element[localJoinTablesColumnsPK].JsonConfig.inJsonFileName = LocalDataToUpdate.inJsonFileName;

                    };

                });

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