let CommonDisplayPullData = require("../../../../DefultFileNames/Display/PullData");

let ReturnArray = ({ inJsonConfig, inItemConfig, inUserPK }) => {
    let LocalReturnData;

    let LocalDisplayData = CommonDisplayPullData.ReturnDataFromJson({ inJsonConfig, inUserPK });
    let LocalItemScreenData = CommonDisplayPullData.FromItemConfig({ inDisplayJsonData: LocalDisplayData, inItemConfig });

    let LocalSubTableKey = "SubTableColumns";

    let LocalSubTableColumnName = inItemConfig.inColumnName;

    LocalColumnData = LocalItemScreenData[LocalSubTableKey][LocalSubTableColumnName].TableColumns;

    LocalReturnData = LocalColumnData.map(LoopItem => LoopItem.DataAttribute);

    return LocalReturnData;
}



module.exports = { ReturnArray };