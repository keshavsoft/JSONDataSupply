let CommonPullData = require("../PullData");

let startfunc = ({ inUserPK }) => {
    let LocalReturnData = {
        Reports: {}
    };

    let LocalData = CommonPullData.ReturnDataFromJson({ inUserPK });

    Object.entries(LocalData).forEach(
        ([key, value]) => {
            LocalReturnData.Reports[key] = {
                ReportName: key,
                OrderByColumns: value.OrderByColumns
            };
        }
    );

    return LocalReturnData;
};

module.exports = {
    startfunc
}