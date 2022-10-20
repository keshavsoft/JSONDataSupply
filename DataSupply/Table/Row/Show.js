let GlobalCommonPullUserData = require("../../Fs/Config/Folders/Files/Items/PullData/FromDataFolder/Pull");

//let GlobalCommonPullUserData = require("../../Fs/Data/Items/PullData");

let CommonPullDataTransformData = require("../../PullData/TransformData");
let CommonReOrder = require("../../CommonTableFuncs/TableFuncs/ReOrder");

exports.Vertical = async ({ inJsonConfig, inItemConfig, inPK, inDataPK }) => {
    let LocalItemName = inItemConfig.inItemName;

    const LocalTransactionData = await GlobalCommonPullUserData.AsJsonAsync({
        inJsonConfig,
        inItemName: LocalItemName, inDataPK
    })

    let LocalDataToShowInDefaultValues = LocalTransactionData[inPK];

    return await LocalDataToShowInDefaultValues;
};

exports.SubTable = ({ inData, inDisplayJsonData, inTableColumnKey, inPK }) => {
    let LocalHtmlVerticalObject = {
        HTMLControlType: "Table", KData: {}
    };

    let LocalTableData;

    try {
        //LocalHtmlVerticalObject.KData.TableColumns = inDisplayJsonData.TableColumns;

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

            LocalHtmlVerticalObject.KData.TableData = LocalTableData;
        };
    } catch (error) {
        console.log("error : ", error);
    };
    return LocalHtmlVerticalObject;
};
