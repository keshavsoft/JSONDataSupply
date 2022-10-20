let _ = require("lodash");
let GlobalReportsPullDataOnly = require("../CommonFuncs/PullDataOnly");
let GlobalCommonPullData = require("../../Fs/Reports/PullData");

let PrepareLedgerAutoJsonWithItemName = ({ inLedgerName, inUserPK }) => {
    let LocalLedgerAutoJson = GlobalCommonPullData.ReturnDataFromJson({ inUserPK });
    let LocalLedgerAutoJsonWithItemName = LocalLedgerAutoJson[inLedgerName];

    return LocalLedgerAutoJsonWithItemName;
};

let LocalFilterFunc = async ({ inDataPK, inFilterObject, inLedgerAutoJsonWithItemName }) => {
    let LocalLedgerAutoJsonWithItemName = inLedgerAutoJsonWithItemName;
    let LocalDataPK = inDataPK;

    let LocalData = await GlobalReportsPullDataOnly.FromItemNameWithOutFilters({
        inLedgerAutoJsonWithItemName: LocalLedgerAutoJsonWithItemName,
        inUserPK: LocalDataPK
    });

    let LocalFilteredData = _.filter(LocalData, inFilterObject);
    let LocalAfterRemoveKeys = _.map(LocalFilteredData, (LoopElement) => {
        return _.omit(LoopElement, Object.keys(inFilterObject));
    });
    //console.log("LocalFilteredData : ",inFilterObject,Object.keys(inFilterObject),LocalAfterRemoveKeys);
    // return await _.omit(  LocalFilteredData,Object.keys(inFilterObject)  );

    return await LocalAfterRemoveKeys;
};

let LocalFilterColumns = ({ inTableColumns, inFilterObject }) => {
    let LocalFilteredColumns = _.filter(inTableColumns, (LoopElement) => {
        //  console.log("kkkkkk : ", Object.keys(inFilterObject).includes(LoopElement.DataAttribute));
        return Object.keys(inFilterObject).includes(LoopElement.DataAttribute) === false;
    });

    let LocalSortedColumns = _.sortBy(LocalFilteredColumns, ["DisplayOrder.inTable"]);
    //console.log("LocalFilteredColumns : ", LocalFilteredColumns.length);
    return LocalSortedColumns;
};


let StartFunc = async ({ inLedgerName, inDataPK, inFilterObject }) => {
    let LocalReturnData = { KTF: false, KMessage: "", DataFromServer: { KData: {} } };
    let LocalDataPK = inDataPK;

    if (LocalDataPK > 0) {
        let LocalLedgerAutoJsonWithItemName = PrepareLedgerAutoJsonWithItemName({ inLedgerName, inUserPK: LocalDataPK });

        LocalReturnData.DataFromServer.KData.TableColumns = LocalFilterColumns({
            inTableColumns: LocalLedgerAutoJsonWithItemName.TableColumns,
            inFilterObject
        });

        //  LocalReturnData.DataFromServer.KData.TableColumns = LocalLedgerAutoJsonWithItemName.TableColumns;

        LocalReturnData.DataFromServer.KData.TableInfo = LocalLedgerAutoJsonWithItemName.TableInfo
        LocalReturnData.DataFromServer.KData.TableData = await LocalFilterFunc({
            inDataPK: LocalDataPK,
            inFilterObject, inLedgerAutoJsonWithItemName: LocalLedgerAutoJsonWithItemName
        });

        LocalReturnData.KTF = true;
    };

    return await LocalReturnData;
};

let MockFuncForShowDataWithOutFilters = async () => {
    return await StartFunc({
        inLedgerName: "Ledger",
        inDataPK: 1024,
        inFilterObject: {
            AccountName: "STATE BANK OF INDIA"
        }
    });
};

//MockFuncForShowDataWithOutFilters().then(p => console.log("MockFuncForShowDataWithOutFilters : ", p.DataFromServer.KData.TableData.length));

module.exports = { StartFunc };
