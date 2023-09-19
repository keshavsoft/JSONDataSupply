let CommonTableFuncs = require("../Save");
let CommonMock = require("../../MockAllow.json");

let CheckAndSave = async ({ JsonConfig, ItemConfig, inDataPK, inDataToSave }) => {
    let inJsonConfig = JsonConfig;
    let inItemConfig = ItemConfig;
    let inPostData = inDataToSave;

    let LocalDataPK = inDataPK;
    let localFromSave;
    let LocalReturnData = { KTF: false };

    if (LocalDataPK > 0 === false) {
        LocalReturnData.KReason = "DataPk not > 0"
        return await LocalReturnData;
    };

    localFromSave = await CommonTableFuncs.Save({ inJsonConfig, inItemConfig, inUserPK: LocalDataPK, inPostData });
    LocalReturnData = { ...localFromSave };
    LocalReturnData.KTF = false;

    if (localFromSave.KTF === false) {
        delete LocalReturnData.JsonData;
        return await LocalReturnData;
    };

    LocalReturnData.kPK = localFromSave.kPK;
    LocalReturnData.KTF = true;

    return await LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K19') {
        let LocalMockData = require('./SaveWithCheck.json');

        CheckAndSave({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);

        });
    };
};

module.exports = {
    CheckAndSave
};