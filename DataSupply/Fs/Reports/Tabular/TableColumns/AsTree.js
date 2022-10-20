var _ = require("lodash");

let CommonPullData = require("../../PullData");

let startfunc = ({ inUserPK }) => {
    let LocalReturnData = {
        Reports: {}
    };

    let LocalData = CommonPullData.ReturnDataFromJson({ inUserPK });

    Object.entries(LocalData).forEach(
        ([key, value]) => {
            LocalReturnData.Reports[key] = {
                ReportName: key,
                TableColumnsObject: LoopTableColumns({ inTableColumns: value.TableColumns })
            };
        }
    );

    return LocalReturnData;
};

let Toggles = ({ inUserPK }) => {
    return startfuncWithInput({
        inUserPK,
        inKeysNeeded: ["DataAttribute", "DisplayName", "OrderNumber", "TextAlign"]
    });
};

let startfuncWithInput = ({ inUserPK, inKeysNeeded }) => {
    let LocalReturnData = {
        Reports: {}
    };

    let LocalData = CommonPullData.ReturnDataFromJson({ inUserPK });

    Object.entries(LocalData).forEach(
        ([key, value]) => {
            LocalReturnData.Reports[key] = {
                ReportName: key,
                TableColumnsObject: LoopTableColumnsWithKeysNeeded({
                    inTableColumns: value.TableColumns,
                    inKeysNeeded
                })
            };
        }
    );

    return LocalReturnData;
};

let LoopTableColumns = ({ inTableColumns }) => {
    let LocalReturnObject = {};

    inTableColumns.forEach(element => {
        LocalReturnObject[element.pk] = element;
    });

    return LocalReturnObject;
};

let LoopTableColumnsWithKeysNeeded = ({ inTableColumns, inKeysNeeded }) => {
    let LocalReturnObject = {};

    inTableColumns.forEach(LoopTableColumn => {
        LocalReturnObject[LoopTableColumn.pk] = {};

        inKeysNeeded.forEach(element => {
            LocalReturnObject[LoopTableColumn.pk][element] = LoopTableColumn[element];
        });
    });

    return LocalReturnObject;
};

module.exports = {
    startfunc,
    Toggles
}