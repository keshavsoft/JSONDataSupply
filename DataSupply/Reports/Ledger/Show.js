let GlobalReportsPullDataOnly = require("../CommonFuncs/PullDataOnly");
let GlobalCommonPullData = require("../../Fs/Reports/PullData");

let PrepareLedgerAutoJsonWithItemName = ({ inLedgerName, inUserPK }) => {
    let LocalLedgerAutoJson = GlobalCommonPullData.ReturnDataFromJson({ inUserPK });
    let LocalReturnData;

    if (inLedgerName in LocalLedgerAutoJson) {
        LocalReturnData = LocalLedgerAutoJson[inLedgerName];
    };

    return LocalReturnData;
};

let ShowDataWithFilters = ({ inLedgerName, inFiltersData, inUserPK }) => {
    return new Promise((resolve, reject) => {
        let LocalArray = [];

        let = { HTMLControlType: "Table", KData: {} };

        if (inUserPK > 0) {
            let LocalLedgerAutoJson = GlobalCommonPullData.ReturnDataFromJson({ inUserPK });

            let LocalLedgerAutoJsonWithItemName = LocalLedgerAutoJson[inLedgerName];
            let LocalReturnArrayObject = { HTMLControlType: "Table", KData: {} };

            LocalReturnArrayObject.KData.TableColumns = LocalLedgerAutoJsonWithItemName["TableColumns"];
            LocalReturnArrayObject.KData.TableInfo = LocalLedgerAutoJsonWithItemName["TableInfo"];
            LocalReturnArrayObject.KData.TableInfo.DataAttributes.ItemConfig = JSON.stringify({ inReportName: inLedgerName });

            LocalReturnArrayObject.KData.TableData = GlobalReportsPullDataOnly.FromItemNameWithFilters({
                inLedgerAutoJsonWithItemName: LocalLedgerAutoJsonWithItemName,
                inFiltersData, inUserPK
            });

            LocalArray.push(LocalReturnArrayObject);

            resolve({ KTF: true, KMessage: "", "DataFromServer": LocalArray });
        };
    });
};

let ShowDataWithOutFilters = async ({ inLedgerName, inUserPK }) => {
    let LocalReturnData = { KTF: false, KMessage: "", DataFromServer: [] };

    if (inUserPK > 0) {
        let LocalReturnArrayObject = { HTMLControlType: "TableReport", KData: {} };

        let LocalLedgerAutoJsonWithItemName = PrepareLedgerAutoJsonWithItemName({ inLedgerName, inUserPK });
        LocalReturnArrayObject.KData.TableColumns = LocalLedgerAutoJsonWithItemName.TableColumns;
        LocalReturnArrayObject.KData.TableInfo = LocalLedgerAutoJsonWithItemName.TableInfo

        LocalReturnArrayObject.KData.TableData = await GlobalReportsPullDataOnly.FromItemNameWithOutFilters({
            inLedgerAutoJsonWithItemName: LocalLedgerAutoJsonWithItemName,
            inUserPK
        });

        LocalReturnData.DataFromServer.push(LocalReturnArrayObject);
        LocalReturnData.KTF = true;
        return await LocalReturnData;
    };
};

let ShowDataFromConfig = ({ inReportConfigJson, inUserPK }) => {
    return new Promise((resolve, reject) => {
        let LocalArray = [];

        if (inUserPK > 0) {
            let LocalReturnArrayObject = { HTMLControlType: "Table", KData: {} };
            let LocalLedgerAutoJsonWithItemName = inReportConfigJson;
            LocalReturnArrayObject.KData.TableColumns = LocalLedgerAutoJsonWithItemName.TableColumns;
            LocalReturnArrayObject.KData.TableInfo = LocalLedgerAutoJsonWithItemName.TableInfo

            LocalReturnArrayObject.KData.TableData = GlobalReportsPullDataOnly.FromItemNameWithOutFilters({ inLedgerAutoJsonWithItemName: LocalLedgerAutoJsonWithItemName, inUserPK });

            LocalArray.push(LocalReturnArrayObject);

            resolve({ KTF: true, KMessage: "", "DataFromServer": LocalArray });
        };
    });
};

// ShowDataWithOutFilters({
//     inLedgerName: "Ledger",
//     inUserPK: 16
// }).then(p => {
//    // console.log("sssss : ", p.DataFromServer[0].KData.TableData);
// });

module.exports = { ShowDataWithFilters, ShowDataWithOutFilters, ShowDataFromConfig };
