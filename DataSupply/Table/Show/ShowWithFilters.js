let CommonDisplayPullData = require("../../Fs/DefultFileNames/Display/PullData");
let CommonFilesPullData = require("../../Fs/Files/PullData");
let CommonPullDataTransformData = require("../../PullData/TransformData");
let CommonReportsVouchersConsiderTransform = require("../../Reports/CommonFuncs/VouchersConsider/Transform");

let ShowWithDateFilter = ({ inJsonConfig, inItemConfig, inUserPK, inDate }) => {
    if (inUserPK > 0) {

        let LocalData = CommonFilesPullData.ReturnDataFromJsonWithItemNameAsArray({ inJsonConfig, inItemConfig, inUserPK });
        
        return { KTF: true, KMessage: "", DataFromServer: LocalData };
    };
};

let ShowLast = ({ inJsonConfig, inItemConfig, inUserPK }) => {
    if (inUserPK > 0) {
        let LocalData = CommonFilesPullData.ReturnDataFromJsonWithItemNameAsArray({ inJsonConfig, inItemConfig, inUserPK });
        let LocalDataSorted = LocalData.slice(-100).reverse().map((LoopItem, LoopIndex) => {
            LoopItem.SNo = LoopIndex + 1;
            return LoopItem;
        });
        return { KTF: true, KMessage: "", DataFromServer: LocalDataSorted };
    };
};

let LocalPrepareTableConfig = ({ inJsonConfig, inItemConfig, inUserPK }) => {
    let LocalDisplayDataNeeded;

    let LocalDisplayData = CommonDisplayPullData.ReturnDataFromJson({ inJsonConfig, inUserPK });
    LocalDisplayDataNeeded = CommonDisplayPullData.FromItemConfig({ inDisplayJsonData: LocalDisplayData, inItemConfig });
    //LocalDisplayDataNeeded = LocalDisplayData[LocalItemName][LocalScreenName];

    return {
        TableColumns: LocalDisplayDataNeeded.TableColumns,
        TableInfo: LocalDisplayDataNeeded.TableInfo
    };
};

let LocalPrepareTableData = ({ inJsonConfig, inItemConfig, inUserPK, inColumns, inTableInfo }) => {
    let LocalData = CommonFilesPullData.ReturnDataFromJsonWithItemNameAsArray({ inJsonConfig, inItemConfig, inUserPK });

    if (inTableInfo.TableInfoServerSide.TransformFromReports) {
        let LocalTransformedColumns = inColumns.map(element => {
            element.DisplayColumn = element.DataAttribute;

            if (element.hasOwnProperty("Name") === false) { element.Name = element.DataAttribute };

            return element;
        });

        let LocalDataFromTransform = CommonReportsVouchersConsiderTransform.Transform({ inColumns: LocalTransformedColumns, inData: LocalData });

        return LocalDataFromTransform;
    } else {
        return LocalData;
    };
};

let ShowLastWithTransformation = ({ inJsonConfig, inItemConfig, inUserPK }) => {
    if (inUserPK > 0) {
        let LocalDataFromTransformToUi;
        let LocalDisplayDataNeeded = LocalPrepareTableConfig({ inJsonConfig, inItemConfig, inUserPK });
        let LocalData = LocalPrepareTableData({ inJsonConfig, inItemConfig, inUserPK, inColumns: LocalDisplayDataNeeded.TableColumns, inTableInfo: LocalDisplayDataNeeded.TableInfo });
        LocalDataFromTransformToUi = CommonPullDataTransformData.FromTransformToUi({ inData: LocalData, inDisplayJsonData: LocalDisplayDataNeeded });
        let LocalDataSorted = LocalDataFromTransformToUi.slice(-100).reverse().map((LoopItem, LoopIndex) => {
            LoopItem.SNo = LoopIndex + 1;
            return LoopItem;
        })

        return { KTF: true, KMessage: "", DataFromServer: LocalDataSorted };
    }
};

module.exports = { ShowWithDateFilter, ShowLast, ShowLastWithTransformation };
