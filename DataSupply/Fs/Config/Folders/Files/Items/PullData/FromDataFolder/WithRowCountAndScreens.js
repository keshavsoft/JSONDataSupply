let CommonPullFromData = require("../../../PullData/FromData");
let CommonPullDataFromDisplayJson = require("../../../PullData/FromConfigFolder/FromDisplayJson/PullFuncs");

let AsTree = async ({ inJsonConfig, inDataPK }) => {
    let LocalDataPK = inDataPK;

    if (LocalDataPK > 0) {
        let LocalReturnObject = {};
        let LocalLoopObject = {};

        let LocalData = await CommonPullFromData.AsJsonAsync({ inJsonConfig, inUserPK: LocalDataPK });
        let LocalDisplayJsonData = await CommonPullDataFromDisplayJson.ItemsAndScreensOnly({
            inJsonConfig,
            inDataPK
        });
        Object.entries(LocalData).forEach(
            ([key, value]) => {
                LocalLoopObject = {};
                LocalLoopObject.ItemName = key;
                LocalLoopObject.RowCount = Object.keys(value).length;
                LocalLoopObject.Screens = {};

                if (key in LocalDisplayJsonData) {
                    LocalDisplayJsonData[key].Screens.forEach(LoopScreen => {
                        LocalLoopObject.Screens[LoopScreen] = {
                            ScreenName: LoopScreen
                        };
                    });
                };

                LocalReturnObject[key] = LocalLoopObject
            }
        );

        return await LocalReturnObject;
    };
};

module.exports = {
    AsTree
};