//let GlobalReportsPullDataOnly = require("../Reports/CommonFuncs/PullDataOnly");

let LocalCommonFuncs = {
    StartFunc: ({ inFolderName, inJsonFileName, inUserPK }) => {
        let LocalReturnArray = [];

        switch (inFolderName) {
            case "Masters":
                //debug("masters----------------------");
                //LocalReturnArray = GlobalFromFolder.FromItemNameAsArray({ inFolderName, inFileName: `${inFolderName}.json`, inItemName, inUserPK })

                break;
            case "Reports":
                //LocalReturnArray = GlobalReportsPullDataOnly.FromItemName({ inItemName, inUserPK });
                break;

            default:
                break;
        };

        return LocalReturnArray;
    }
};

let PrepareJoinTableData = ({ inDisplayJsonDataNeeded, inUserPK }) => {
    // debug("inDisplayJsonDataNeeded : ", inDisplayJsonDataNeeded);
    let LocalJoinTablesArray = inDisplayJsonDataNeeded.JoinTables;
    let LocalJoinTableData = {};
    let LocalSplitArray = [];
    let LocalJoinTableDataValue = [];
    let LocalLoopJoinTableArrayObject;

    if (LocalJoinTablesArray !== undefined) {
        if (LocalJoinTablesArray.length > 0) {
            LocalJoinTablesArray.forEach(LoopItem => {
                LocalLoopJoinTableArrayObject = Object.values(LoopItem)[0].JsonConfig;

                LocalJoinTableDataValue = LocalCommonFuncs.StartFunc({
                    inFolderName: LocalLoopJoinTableArrayObject.inFolderName,
                    inJsonFileName: LocalLoopJoinTableArrayObject.inJsonFileName, inUserPK
                });

                LocalJoinTableData[LoopItem] = LocalJoinTableDataValue;
            });
        }
    }
    return LocalJoinTableData;
};

module.exports = { PrepareJoinTableData };