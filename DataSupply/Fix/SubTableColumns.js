let CommonPullData = require("../Fs/DefultFileNames/Display/PullData");
let CommonPushData = require("../Fs/DefultFileNames/Display/PushData");
let CommonSingleColumn = require("./CommonFuncs/TableColumns");

let Fix = async ({ inJsonConfig, inItemConfig, inUserPK }) => {
    if (inUserPK > 0) {
        let LocalReturnData = { KTF: false, KReason: "" };
        let LocalReturnFromPush;
        let LocalDisplayData = await CommonPullData.ReturnDataAsyncOriginal({ inJsonConfig, inUserPK });
        let LocalDatatoUpdate = JSON.parse(JSON.stringify(LocalDisplayData));
        let LocalDataWithScreenName = LocalDatatoUpdate[inItemConfig.inItemName][inItemConfig.inScreenName];

        if ("SubTableColumns" in LocalDataWithScreenName) {
            LocalLoopSubTableColumns({ inSubTableColumns: LocalDataWithScreenName.SubTableColumns });

            LocalReturnFromPush = await CommonPushData.PushDataFuncAsync({ inJsonConfig, inUserPK, inOriginalData: LocalDisplayData, inDataToUpdate: LocalDatatoUpdate });

            if (LocalReturnFromPush.KTF) {
                LocalReturnData.KTF = true;
            };
        } else {
            LocalReturnData.KReason = "SubTableColumns not found";
        };

        return await LocalReturnData;
    };
};

let LocalLoopSubTableColumns = ({ inSubTableColumns }) => {
    Object.entries(inSubTableColumns).forEach(([key, value]) => {
        inSubTableColumns[key].TableColumns = CommonSingleColumn.FixAll({ inTableColumns: value.TableColumns });
    });
};

module.exports = { Fix };