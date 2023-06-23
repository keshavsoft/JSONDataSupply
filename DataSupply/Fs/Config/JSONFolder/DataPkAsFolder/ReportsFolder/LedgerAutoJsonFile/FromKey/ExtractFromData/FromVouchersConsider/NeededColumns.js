let _ = require("lodash");
let Common = require("../../../../../../../../../Reports/CommonFuncs/VouchersConsider/Transform");


let StartFunc = ({ inDataArray }) => {
    let LocalDataArray = LocalDataWithSubTable({ inDataArray });

    let LocalData = LocalDataArray.map(element => {
        let LoopInsideColumnsArray = element.ReportConfig.Columns.map(element => element.Name);

        element.ColumnsArray = LoopInsideColumnsArray;

        element.ColumnsNeededOnly1 = LocalColumnsNeededOnly({
            inDataWithSubTable: element.DataWithSubTable,
            inReportConfigColumns: element.ReportConfig.Columns
        });

        element.ColumnsNeededOnly = Common.Transform({
            inData: element.DataWithSubTable,
            inColumns: element.ReportConfig.Columns
        });

        return element;
    });


    return LocalData;
};

let LocalColumnsNeededOnly = ({ inDataWithSubTable, inReportConfigColumns }) => {
    return inDataWithSubTable.map(LoopRow => {
        let LoopInsideObject = {};

        inReportConfigColumns.forEach(LoopColumn => {
            LoopInsideObject[LoopColumn.DisplayColumn] = LoopRow[LoopColumn.Name];
        });

        return LoopInsideObject;
    });
};

let LocalFromTransform = ({ inDataWithSubTable, inReportConfigColumns }) => {
    return inDataWithSubTable.map(LoopObject => {
        let LocalNewObject = {};

        Object.entries(LoopObject).forEach(
            ([key, value]) => {
                LocalNewObject[`${inStringToAdd}.${key}`] = value;
            }
        );

        return LocalNewObject;
    });
};



let LocalDataWithSubTable = ({ inDataArray }) => {
    let LocalDataArray = inDataArray;

    let LocaData = LocalDataArray.map(element => {
        let LoopInsideColumnNameToPick = element.ReportConfig.ColumnNameToPick;
        let LoopInisideArray = [];

        Object.values(element.JsonData).forEach(LoopMainTable => {
            Object.values(LoopMainTable[LoopInsideColumnNameToPick]).forEach(LoopSubTable => {
                LoopInisideArray.push({
                    ...LoopMainTable, ...LocalNewObject({
                        inOldObject: LoopSubTable,
                        inStringToAdd: LoopInsideColumnNameToPick
                    })
                });
            });
        });

        element.DataWithSubTable = LoopInisideArray;
        return element;
    });

    return LocaData;
};

let LocalNewObject = ({ inOldObject, inStringToAdd }) => {
    let LocalNewObject = {};

    Object.entries(inOldObject).forEach(
        ([key, value]) => {
            LocalNewObject[`${inStringToAdd}.${key}`] = value;
        }
    );

    return LocalNewObject;
};

module.exports = { StartFunc };
