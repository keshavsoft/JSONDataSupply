let CommonFilesPullData = require("../../../Fs/Config/Folders/Files/PullData/FromData");
let CommonFilesPushData = require("../../../Fs/Config/Folders/Files/PushData/ToData");
let CommonSaveFuncs = require("../../../SaveFuncs");

let SaveWithOutScreenName = async ({ inJsonConfig, inItemConfig, inUserPK, inPostData }) => {
    try {
        let LocalUserData;

        if (inUserPK > 0) {
            LocalUserData = await CommonFilesPullData.AsJsonAsync({ inJsonConfig, inUserPK });
            
            return await SaveOnly({
                inJsonConfig,
                inOriginalData: LocalUserData,
                inItemName: inItemConfig.inItemName, inPostData, inUserPK
            });
        };
    } catch (error) {
        console.log("error : ", error);
    }
};

let LocalMockFunc = async () => {
    await SaveWithOutScreenName({
        inJsonConfig: {
            inFolderName: "Masters",
            inJsonFileName: "Customers.json"
        }, inItemConfig: {
            inItemName: "CustomerNames"
        }, inUserPK: 2017,
        inPostData: {
            CustomerName: "aaaaaaaaaaaaaa",
            Mobile: 9999999999
        }
    });
};

// LocalMockFunc().then();

module.exports = {
    SaveWithOutScreenName
};
