let GlobalReportsPullDataOnly = require("../CommonFuncs/PullDataOnly");
let GlobalCommonPullData = require("../../Fs/Reports/PullData");

let PrepareLedgerAutoJsonWithItemName = ({ inLedgerName, inUserPK }) => {
    let LocalJsonConfig = { inFolderName: "Reports", inJsonFileName: "LedgerAuto.json" };
    let LocalLedgerAutoJson = GlobalCommonPullData.ReturnDataFromJson({ inUserPK });
    let LocalLedgerAutoJsonWithItemName = LocalLedgerAutoJson[inLedgerName];

    return LocalLedgerAutoJsonWithItemName;
};

let ShowDataWithOutFilters = async ({ inLedgerName, inUserPK }) => {
    let LocalReturnObject = { KTF: false, KMessage: "", DataFromServer: "" };

    if (inUserPK > 0) {
        let LocalLedgerAutoJsonWithItemName = PrepareLedgerAutoJsonWithItemName({ inLedgerName, inUserPK });

        LocalReturnObject.DataFromServer = await GlobalReportsPullDataOnly.FromItemNameWithOutFilters({
            inLedgerAutoJsonWithItemName: LocalLedgerAutoJsonWithItemName,
            inUserPK
        });
        LocalReturnObject.KTF = true;
    };

    return await LocalReturnObject;
};

let MockFuncForShowDataWithOutFilters = async () => {
    return await ShowDataWithOutFilters({
        inLedgerName: "SaleQty",
        inUserPK: 1024
    });
};

//MockFuncForShowDataWithOutFilters().then(p => console.log("MockFuncForShowDataWithOutFilters : ", p));

module.exports = { ShowDataWithOutFilters };
