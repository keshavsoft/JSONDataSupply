//const path = require('path');

//let CommonPullDataAdmin = require("../../../../PullData/Admin");
//let CommonPullDataAdmin = require("../../../../PullData/");
//let CommonPushDataAdmin = require("../../../../PushData/Admin");
let CommonFixColumn = require("../../../../../Fix/CommonFuncs/TableColumns");
let CommonFromItemConfig = require("../../../../PullData/FromItemConfig");
let CommonPullDataAdmin = require("../../../../Config/Folders/Files/PullData/FromConfig");
let CommonPushDataAdmin = require("../../../../Config/Folders/Files/PushData/ToConfig");


let FixColumnData = ({ inColumnObject }) => {
    inColumnObject.CreateNew = true;
    inColumnObject.Insert = true;
    inColumnObject.ShowInTable = true;
};

let Insert = ({ inJsonConfig, inItemConfig, inColumnName, inSubTableColumnName, inUserPK }) => {
    let LocalReturnData = { KTF: false, LocalCreateItem: "" };
    let LocalNewColumnObject = {};
    let LocalSubTable = inItemConfig.inColumnName;

    CommonFixColumn.FixSingleColumn({ inObjectToFix: LocalNewColumnObject });
    FixColumnData({ inColumnObject: LocalNewColumnObject });

    LocalNewColumnObject.DisplayName = inItemConfig.inSubTableColumnName;
    LocalNewColumnObject.DataAttribute = inItemConfig.inSubTableColumnName;

    let LocalDisplayData = CommonPullDataAdmin.AsJsonAsync({ inJsonConfig, inUserPK });

    let LocalDisplayDataObject = JSON.parse(JSON.stringify(LocalDisplayData));
    let LocalItemScreenData = CommonFromItemConfig.PullData({
        inDisplayJsonData: LocalDisplayDataObject,
        inItemConfig
    });

    LocalItemScreenData.SubTableColumns[LocalSubTable].TableColumns.push(LocalNewColumnObject);

    CommonPushDataAdmin.AsAsync({ inJsonConfig, inUserPK, inOriginalData: LocalDisplayData, inDataToUpdate: LocalDisplayDataObject }).then(PromiseData => {
        LocalReturnData.KTF = true;
        return LocalReturnData;
    }).catch();
};

module.exports = { Insert };