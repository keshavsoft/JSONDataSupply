let CommonPullFromData = require("../../../../PullData/FromData");

let AsObject = async ({ inJsonConfig, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnObject = { ItemCount: 0 };

    if (LocalDataPK > 0) {

        let LocalLoopObject = {};

        let LocalData = await CommonPullFromData.AsJsonAsync({ inJsonConfig, inUserPK: LocalDataPK });

        LocalReturnObject.ItemCount = Object.keys(LocalData).length;
    };

    return await LocalReturnObject;
};

module.exports = {
    AsObject
};