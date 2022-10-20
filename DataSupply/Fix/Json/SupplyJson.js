let CommonTableInfo = require("./TableInfo.json");
let CommonTableColumn = require("./TableColumn.json");
let CommonReturnData = require("./ReturnData.json");

exports.TableInfo = () => {
    return JSON.parse(JSON.stringify(CommonTableInfo));
};

exports.TableColumn = () => {
    return JSON.parse(JSON.stringify(CommonTableColumn));
};

exports.ReturnData = () => {
    return CommonReturnData;
};