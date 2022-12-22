let CommonPullData = require("../../../../PullData/FromData");

let AsJsonAsyncAsObject = async ({ inJsonConfig, inItemName, inDataPK, inRowPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnObject = { KTF: false, KReason: "" };
    console.log("aaaaaaaa : ", inJsonConfig, inItemName, inDataPK, inRowPK);
    if (LocalDataPK > 0) {
        let LocalDataFromJSON = await CommonPullData.AsJsonAsync({
            inJsonConfig, inUserPK: LocalDataPK
        });

        if (inItemName in LocalDataFromJSON) {
            if (inRowPK in LocalDataFromJSON[inItemName]) {
                LocalReturnObject.KTF = true;
                LocalReturnObject.JsonData = LocalDataFromJSON[inItemName][inRowPK];
            } else {
                LocalReturnObject.KReason = `RowPK not found : ${inRowPK}`;
            };
        } else {
            LocalReturnObject.KReason = `Item Name not found : ${inItemName}`;
        };

        return await LocalReturnObject;
    };
};

module.exports = {
    AsJsonAsyncAsObject
};