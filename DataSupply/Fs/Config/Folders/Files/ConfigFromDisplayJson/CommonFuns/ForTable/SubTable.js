let CommonPullDataTransformData = require("./TransformFuncs/TransformData");
let CommonReOrder = require("./CommonTableFuncs/TableFuncs/ReOrder");
let CommonAlterColumnOrder = require("./TransformFuncs/AlterColumnOrder");


exports.SubTable = ({ inData, inDisplayJsonData, inTableColumnKey, inPK }) => {
    let LocalHtmlVerticalObject = {
        HTMLControlType: "SubTable", KData: {}
    };

    let LocalTableData;

    try {
        LocalHtmlVerticalObject.KData.TableColumns = CommonReOrder.StartFunc({
            inTableColumns: inDisplayJsonData.TableColumns,
            inTableInfo: inDisplayJsonData.TableInfo
        });

        if ("TableInfo" in inDisplayJsonData) {
            LocalHtmlVerticalObject.KData.TableInfo = inDisplayJsonData.TableInfo;

            if ("DataAttributes" in LocalHtmlVerticalObject.KData.TableInfo) {
                LocalHtmlVerticalObject.KData.TableInfo.DataAttributes.InsertKey = inTableColumnKey;
                LocalHtmlVerticalObject.KData.TableInfo.DataAttributes.PK = inPK;
            };

            LocalTableData = CommonPullDataTransformData.FromTransformToUi({ inData, inDisplayJsonData });

            LocalTableData = CommonAlterColumnOrder.FromTransformToUi({
                inData: LocalTableData,
                inTableColumns: LocalHtmlVerticalObject.KData.TableColumns
            });

            LocalHtmlVerticalObject.KData.TableData = LocalTableData;
        };
    } catch (error) {
        console.log("error : ", error);
    };

    return LocalHtmlVerticalObject;
};
