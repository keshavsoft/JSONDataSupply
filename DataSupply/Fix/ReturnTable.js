let CommonPullData = require("../Fs/DefultFileNames/ReturnData/PullData");
let CommonPushData = require("../Fs/DefultFileNames/ReturnData/PushData");
let CommonReturnDataJson = require("./Json/ReturnData.json");

class LocalKeshavSoftCrud {
    static SwapData = {
        LoopRecursiveObject: ({ inData, inJson }) => {
            if (inData !== undefined) {
                Object.entries(inJson).forEach(
                    ([key, value]) => {
                        if (typeof value === 'object') {
                            if (key !== "DefaultValue") {
                                this.SwapData.LoopRecursiveObject({ inData: inData[key], inJson: value });
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
                this.SwapData.LoopRecursiveObject({ inData, inJson });
            }
        }
    }
};

class CommonSwapData {
    static SwapData = {
        LoopRecursiveObject: ({ inData, inJson }) => {
            if (inData !== undefined) {
                _.forOwn(inJson, (value, key) => {
                    if (typeof value === 'object') {
                        if (key !== "DefaultValue") {
                            this.SwapData.LoopRecursiveObject({ inData: inData[key], inJson: value });
                        };
                    } else {
                        if (inData.hasOwnProperty(key)) {
                            inData[key] = value;
                        };
                    }
                });
            };
        },
        CallLoopStart: ({ inData, inJson }) => {
            if (typeof inJson === 'object') {
                this.SwapData.LoopRecursiveObject({ inData, inJson });
            }
        }
    }
};

let Fix = async ({ inJsonConfig, inItemConfig, inUserPK }) => {
    let LocalReturnData = { KTF: false };

    if (inUserPK > 0) {
        let LocalRetrunFromPush;
        let LocalReturnDataJson = CommonPullData.ReturnDataFromJson({ inJsonConfig, inUserPK });
        let LocalReturnDataToUpdate = JSON.parse(JSON.stringify(LocalReturnDataJson));
        let LocalItemData;
        let LocalScreenData;

        if (inItemConfig.inItemName in LocalReturnDataToUpdate === false) {
            LocalReturnDataToUpdate[inItemConfig.inItemName] = {};
        };

        LocalItemData = LocalReturnDataToUpdate[inItemConfig.inItemName];

        if (inItemConfig.inScreenName in LocalItemData === false) {
            LocalItemData[inItemConfig.inScreenName] = {};
        };

        LocalScreenData = LocalItemData[inItemConfig.inScreenName];

        LocalKeshavSoftCrud.SwapData.CallLoopStart({
            inJson: LocalScreenData,
            inData: CommonReturnDataJson
        });

        LocalReturnDataToUpdate[inItemConfig.inItemName][inItemConfig.inScreenName] = CommonReturnDataJson;

        LocalRetrunFromPush = await CommonPushData.PushDataFunc({ inJsonConfig, inUserPK, inOriginalData: LocalReturnDataJson, inDataToUpdate: LocalReturnDataToUpdate });

        if (LocalRetrunFromPush.KTF) {
            LocalReturnData.KTF = true;
        }
    };

    return LocalReturnData;
};

module.exports = { Fix };