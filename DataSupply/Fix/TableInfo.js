let CommonPullData = require("../Fs/DefultFileNames/Display/PullData");
let CommonPushData = require("../Fs/DefultFileNames/Display/PushData");

let CommonSupplyJson = require("./Json/SupplyJson");

let KeshavSoftCrud = {
    SwapData: {
        LoopRecursiveObject: ({ inData, inJson }) => {
            if (inData !== undefined) {
                Object.entries(inJson).forEach(
                    ([key, value]) => {
                        if (typeof value === 'object') {
                            if (key !== "DefaultValue") {
                                KeshavSoftCrud.SwapData.LoopRecursiveObject({ inData: inData[key], inJson: value });
                            };
                        } else {
                            if (inData.hasOwnProperty(key)) {
                                inData[key] = value;
                            };
                        }
                    }
                );
            };
        },
        CallLoopStart: ({ inData, inJson }) => {
            if (typeof inJson === 'object') {
                KeshavSoftCrud.SwapData.LoopRecursiveObject({ inData, inJson });
            }
        }
    }
};

let FixAsyncFromJson = async ({ inJsonConfig, inItemConfig, inUserPK }) => {
    if (inUserPK > 0) {
        let LocalTableInfoJson = CommonSupplyJson.TableInfo();
        let LocalDisplayData = await CommonPullData.ReturnDataAsyncOriginal({ inJsonConfig, inItemConfig, inUserPK });
        let LocalDatatoUpdate = JSON.parse(JSON.stringify(LocalDisplayData));

        let LocalDataTableInfo = LocalDatatoUpdate[inItemConfig.inItemName][inItemConfig.inScreenName]["TableInfo"];

        KeshavSoftCrud.SwapData.CallLoopStart({
            inJson: LocalDataTableInfo,
            inData: LocalTableInfoJson
        });

        LocalDatatoUpdate[inItemConfig.inItemName][inItemConfig.inScreenName].TableInfo = LocalTableInfoJson;

        let LocalReturnData = await CommonPushData.PushDataFuncAsync({ inJsonConfig, inUserPK, inOriginalData: LocalDisplayData, inDataToUpdate: LocalDatatoUpdate });

        return await LocalReturnData;
    };
};

module.exports = { FixAsyncFromJson };