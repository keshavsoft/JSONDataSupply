let CommonPullData = require("../PullData");
let CommonPushData = require("../PushData");
let CommonFuncs = require("../../../Fix/CommonFuncs/TableColumns");

let FixAll = async ({ inReportName, inUserPK }) => {
    let LocalReturnData;
    let LocalDataToUpdate;
    let LocalOriginalData;

    let LocalDataNeeded;
    let LocalTableColumns;

    if (inUserPK > 0) {
        LocalOriginalData = CommonPullData.ReturnDataFromJson({ inUserPK });
        LocalDataToUpdate = JSON.parse(JSON.stringify(LocalOriginalData));

        LocalDataNeeded = LocalDataToUpdate[inReportName];
        LocalTableColumns = LocalDataNeeded.TableColumns;

        CommonFuncs.FixAll({ inTableColumns: LocalDataNeeded.TableColumns });

        LocalReturnData = await CommonPushData.PushDataAsync({
            inUserPK,
            inOriginalData: LocalOriginalData, inDataToUpdate: LocalDataToUpdate
        });

        return await LocalReturnData;
    };
};

module.exports = { FixAll };