let CommonPullData = require("../Fs/DefultFileNames/Display/PullData");
let CommonPushData = require("../Fs/DefultFileNames/Display/PushData");
let CommonSingleColumn = require("./CommonFuncs/TableColumns");

let Fix = async ({ inJsonConfig, inItemConfig, inUserPK }) => {
  if (inUserPK > 0) {
    let LocalDisplayData = await CommonPullData.ReturnDataAsyncOriginal({ inJsonConfig, inUserPK });
    let LocalDatatoUpdate = JSON.parse(JSON.stringify(LocalDisplayData));
    let LocalDataWithScreenName = LocalDatatoUpdate[inItemConfig.inItemName][inItemConfig.inScreenName];

    let LocalDataTableColumns = LocalDataWithScreenName.TableColumns;

    LocalDatatoUpdate[inItemConfig.inItemName][inItemConfig.inScreenName].TableColumns = CommonSingleColumn.FixAll({ inTableColumns: LocalDataTableColumns });

    return await CommonPushData.PushDataFuncAsync({ inJsonConfig, inUserPK, inOriginalData: LocalDisplayData, inDataToUpdate: LocalDatatoUpdate });
  };
};

module.exports = { Fix };