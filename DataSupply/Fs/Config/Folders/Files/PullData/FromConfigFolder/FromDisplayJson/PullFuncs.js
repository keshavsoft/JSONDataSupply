let CommonFromDisplayJson = require("../FromDisplayJson");

let ItemsAndScreensOnly = async ({ inJsonConfig, inDataPK }) => {
    //console.log("inUserPK : ", inUserPK);
    let LocalDataPK = inDataPK;
    let LocalReturnObject = {};

    try {
        if (LocalDataPK > 0) {
            let LocalDisplayJsonData = await CommonFromDisplayJson.AsJsonAsync({ inJsonConfig, inDataPK });

            if (LocalDisplayJsonData.KTF) {
                Object.entries(LocalDisplayJsonData.JsonData).forEach(
                    ([key, value]) => {
                        LocalReturnObject[key] = {
                            ItemName: key,
                            Screens: Object.keys(value)
                        };
                    }
                );
            };
        };

    } catch (error) {
        console.log("error : ", inJsonConfig, error);
    };

    return await LocalReturnObject;
};

module.exports = {
    ItemsAndScreensOnly
};