let CommonTableFuncs = require("../Save");
let CommonDataSupplyReturnDataFuncs = require("../../Fs/Config/Folders/Files/ConfigFromDisplayJson/CommonFuns/ReturnDataFuncs");
let CommonMock = require("../../MockAllow.json");

let StartFunc = async ({ JsonConfig, ItemConfig, inDataPK, inDataToSave }) => {
    let inJsonConfig = JsonConfig;
    let inItemConfig = ItemConfig;
    let inPostData = inDataToSave;

    let LocalDataPK = inDataPK;
    let localFromSave;
    let LocalReturnData = { KTF: false };

    if (LocalDataPK > 0 === false) {
        LocalReturnData.KReason="DataPk not > 0"
        return await LocalReturnData;
    };

    localFromSave = await CommonTableFuncs.Save({ inJsonConfig, inItemConfig, inUserPK: LocalDataPK, inPostData });

    if (localFromSave.KTF === false) {
        return await localFromSave;
    };

    if (localFromSave.KTF) {
        LocalReturnData.kPK = localFromSave.kPK;
        LocalReturnData.KTF = true;

        let ReturnData = await CommonDataSupplyReturnDataFuncs.VerticalSave({
            inJsonConfig, inItemConfig,
            inPK: localFromSave.kPK,
            inUserPK: LocalDataPK,
            inPostData
        });

        if (ReturnData !== undefined) {
            if (ReturnData.KTF) {
                LocalReturnData.DataFromServer = ReturnData.DataFromServer;
                LocalReturnData.KStudy = ReturnData.KStudy;
            } else {
                if ("KReason" in ReturnData) {
                    LocalReturnData.KReason = ReturnData.KReason;
                };
            };
        };
    };


    return await LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K18') {
        let LocalMockData = require('./Save.json');

        StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        }).then(PromiseData => {
            console.log('PromiseData : ', PromiseData);

        });
    };
};

module.exports = {
    StartFunc
};