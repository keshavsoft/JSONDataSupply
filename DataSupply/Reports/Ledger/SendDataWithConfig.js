let _ = require("lodash");
let GlobalReportsPullDataOnly = require("../CommonFuncs/PullDataOnly");
let GlobalCommonPullData = require("../../Fs/Reports/PullData");

let PrepareLedgerAutoJsonWithItemName = ({ inLedgerName, inUserPK }) => {
    let LocalLedgerAutoJson = GlobalCommonPullData.ReturnDataFromJson({ inUserPK });
    let LocalLedgerAutoJsonWithItemName = LocalLedgerAutoJson[inLedgerName];

    return LocalLedgerAutoJsonWithItemName;
};

let ShowDataWithOutFilters = async ({ inLedgerName, inUserPK }) => {
    let LocalReturnData = { KTF: false, KMessage: "", DataFromServer: { KData: {} } };

    if (inUserPK > 0) {
        let LocalLedgerAutoJsonWithItemName = PrepareLedgerAutoJsonWithItemName({ inLedgerName, inUserPK });

        LocalReturnData.DataFromServer.KData.TableColumns = LocalLedgerAutoJsonWithItemName.TableColumns;
        LocalReturnData.DataFromServer.KData.TableInfo = LocalLedgerAutoJsonWithItemName.TableInfo
        LocalReturnData.DataFromServer.KData.TableData = await GlobalReportsPullDataOnly.FromItemNameWithOutFilters({ inLedgerAutoJsonWithItemName: LocalLedgerAutoJsonWithItemName, inUserPK });

        LocalReturnData.KTF = true;
    };

    return await LocalReturnData;
};

let DataWithConfigColumnsOnly = async ({ inLedgerName, inUserPK }) => {
    let LocalReturnData = { KTF: false, KMessage: "", DataFromServer: { KData: {} } };

    if (inUserPK > 0) {
        let LocalLedgerAutoJsonWithItemName = PrepareLedgerAutoJsonWithItemName({ inLedgerName, inUserPK });
        let LocalShowInTableColumns = _.filter(LocalLedgerAutoJsonWithItemName.TableColumns, { ShowInTable: true });
        let LocalColumnsArray = LocalShowInTableColumns.map(element => element.DataAttribute);
        let LocalDataOnly = await GlobalReportsPullDataOnly.FromItemNameWithOutFilters({ inLedgerAutoJsonWithItemName: LocalLedgerAutoJsonWithItemName, inUserPK });

        LocalReturnData.DataFromServer = LocalDataOnly.map(element => {
            return _.pick(element, LocalColumnsArray);
        });

        LocalReturnData.KTF = true;
    };

    return await LocalReturnData;
};

let DataWithConfigColumnsOnly1 = async ({ inLedgerName, inUserPK }) => {
    let LocalReturnData = { KTF: false, KMessage: "", DataFromServer: { KData: {} } };

    if (inUserPK > 0) {
        let LocalLedgerAutoJsonWithItemName = PrepareLedgerAutoJsonWithItemName({ inLedgerName, inUserPK });

        LocalReturnData.DataFromServer = await GlobalReportsPullDataOnly.FromItemNameWithOutFiltersShowInTableColumnsOnly({
            inLedgerAutoJsonWithItemName: LocalLedgerAutoJsonWithItemName,
            inUserPK
        });

        LocalReturnData.KTF = true;
    };

    return await LocalReturnData;
};

let MockFuncForShowDataWithOutFilters = async () => {
    return await ShowDataWithOutFilters({
        inLedgerName: "SaleQty",
        inUserPK: 1024
    });
};

//MockFuncForShowDataWithOutFilters().then(p => console.log("MockFuncForShowDataWithOutFilters : ", p));

module.exports = { ShowDataWithOutFilters, DataWithConfigColumnsOnly };
