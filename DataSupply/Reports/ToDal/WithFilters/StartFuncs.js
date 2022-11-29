let _ = require("lodash");
let GlobalReportsPullDataOnly = require("../../CommonFuncs/PullDataOnly");
let GlobalCommonPullData = require("../../../Fs/Reports/PullData");

let PrepareLedgerAutoJsonWithItemName = ({ inLedgerName, inDataPK }) => {
    let LocalLedgerAutoJson = GlobalCommonPullData.ReturnDataFromJson({ inUserPK: inDataPK });
    let LocalLedgerAutoJsonWithItemName = LocalLedgerAutoJson[inLedgerName];

    return LocalLedgerAutoJsonWithItemName;
};

let LocalFilterData = async ({ inLedgerName, inDataPK, inFilterObject }) => {
    let LocalFullData = await GlobalReportsPullDataOnly.FromItemNameWithOutFilters({
        inLedgerAutoJsonWithItemName: inLedgerName,
        inUserPK: inDataPK
    });
    
    //console.log("inFilterObject : ", inFilterObject);

    let LocalFilteredData = _.filter(LocalFullData, inFilterObject);
    //console.log('LocalFilteredData : ,', LocalFilteredData);
    return await LocalFilteredData;
};

let StartFunc = async ({ inLedgerName, inDataPK, inFilterObject }) => {
    let LocalReturnData = { KTF: false, KMessage: "", DataFromServer: { KData: {} } };
    let LocalFilterObject = {
        ProductName: "17.17.17.CIL"
    };
    //console.log("LocalFilterObject : ", LocalFilterObject);
    if (inDataPK > 0) {
        let LocalLedgerAutoJsonWithItemName = PrepareLedgerAutoJsonWithItemName({ inLedgerName, inDataPK });

        LocalReturnData.DataFromServer.KData.TableColumns = LocalLedgerAutoJsonWithItemName.TableColumns;
        LocalReturnData.DataFromServer.KData.TableInfo = LocalLedgerAutoJsonWithItemName.TableInfo
        // LocalReturnData.DataFromServer.KData.TableData = await GlobalReportsPullDataOnly.FromItemNameWithOutFilters({
        //     inLedgerAutoJsonWithItemName: LocalLedgerAutoJsonWithItemName,
        //     inUserPK: inDataPK
        // });
        LocalReturnData.DataFromServer.KData.TableData = await LocalFilterData({
            inLedgerName: LocalLedgerAutoJsonWithItemName,
            inDataPK,
            inFilterObject
        });

        LocalReturnData.KTF = true;
    };

    return await LocalReturnData;
};

module.exports = { StartFunc };
