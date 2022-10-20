let _ = require("lodash");
let debug = require("debug")("KS13");
let CommonPullDataAdmin = require("../../../Fs/PullData/Reports");
let TableInfoCheckData = require("../../../../CommonData/Admin/Config/check")

let ReturnTableInfoDataWithKey = ({ inJsonConfig, inItemConfig, inUserPK }) => {
    let LocalDisplayData = CommonPullDataAdmin.DisplayJson({ inJsonConfig, inUserPK });
    let LocalTableInfoData

    LocalTableInfoData = LocalDisplayData[inItemConfig.inItemName][inItemConfig.inScreenName].TableInfo;

    return LocalTableInfoData;
};

let CommonFunc = ({ inReportConfig, inUserPK, inQueryObject }) => {
    let LocalDisplayData = CommonPullDataAdmin.PullDataReport({ inUserPK });
    let LocalTableInfoData;
    LocalTableInfoData = TableInfoCheckData.PullData({ inItemConfig: inReportConfig, inQueryObject, inDisplayData: LocalDisplayData });
    debug("LocalTableInfoData : ", LocalTableInfoData);
    return LocalTableInfoData;
};

module.exports = { ReturnTableInfoDataWithKey, CommonFunc };