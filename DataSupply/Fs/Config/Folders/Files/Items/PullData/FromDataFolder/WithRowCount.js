let CommonPull = require("./Pull");
let CommonPullFromData = require("../../../PullData/FromData");

let StartFunc = async ({ inJsonConfig, inDataPk }) => {
    if (inDataPk > 0) {
        let LocalReturnArray = [];
        let LocalLoopObject = {};

        let LocalData = await CommonPull.StartFunc({ inJsonConfig, inDataPk });

        Object.entries(LocalData).forEach(
            ([key, value]) => {
                LocalLoopObject = {};
                LocalLoopObject.ItemName = key;
                LocalLoopObject.RowCount = Object.keys(value).length;

                LocalReturnArray.push(LocalLoopObject);
            }
        );

        return await LocalReturnArray;
    };
};

let AsTree = async ({ inJsonConfig, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnObject = {};

    if (LocalDataPK > 0) {

        let LocalLoopObject = {};

        let LocalData = await CommonPullFromData.AsJsonAsync({ inJsonConfig, inUserPK: LocalDataPK });

        Object.entries(LocalData).forEach(
            ([key, value]) => {
                LocalLoopObject = {};
                LocalLoopObject.ItemName = key;
                LocalLoopObject.RowCount = Object.keys(value).length;

                LocalReturnObject[key] = LocalLoopObject
            }
        );
    };

    return await LocalReturnObject;
};

module.exports = {
    StartFunc,
    AsTree
};