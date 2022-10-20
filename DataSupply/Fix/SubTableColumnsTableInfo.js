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


let LocalLoopSubTableColumns = ({ inSubTableColumns }) => {
    let LocalSubDataTableInfo;
    let LocalTableInfoJson = CommonSupplyJson.TableInfo();

    Object.entries(inSubTableColumns).forEach(([key, value]) => {
        LocalSubDataTableInfo = inSubTableColumns[key].TableInfo;

        KeshavSoftCrud.SwapData.CallLoopStart({
            inJson: LocalSubDataTableInfo,
            inData: LocalTableInfoJson
        });

        inSubTableColumns[key].TableInfo = LocalTableInfoJson;
    });
};

let FixAsyncFromJson = async ({ inJsonConfig, inItemConfig, inUserPK }) => {
    if (inUserPK > 0) {

        let LocalDisplayData = await CommonPullData.ReturnDataAsyncOriginal({ inJsonConfig, inItemConfig, inUserPK });
        let LocalDatatoUpdate = JSON.parse(JSON.stringify(LocalDisplayData));
        let LocalDataWithScreenName = LocalDatatoUpdate[inItemConfig.inItemName][inItemConfig.inScreenName];
        let LocalSubDataTableInfo;
        let LocalReturnData = { KTF: false, KReason: "" };

        if ("SubTableColumns" in LocalDataWithScreenName) {
            LocalLoopSubTableColumns({ inSubTableColumns: LocalDataWithScreenName.SubTableColumns });

            LocalReturnData = await CommonPushData.PushDataFuncAsync({ inJsonConfig, inUserPK, inOriginalData: LocalDisplayData, inDataToUpdate: LocalDatatoUpdate });
        } else {
            LocalReturnData.KReason = "SubTableColumns not found";
        };

        return await LocalReturnData;
    };
};

module.exports = { FixAsyncFromJson };