let CommonPullData = require("../../../../../PullData/FromConfigFolder/FromDisplayJson/NoSync");
let CommonMock = require("../../../../../../../../../MockAllow.json");

let StartFunc = ({ inJsonConfig, inItemConfig, inDataPK }) => {
    let LocalReturnObject = { KTF: false, DirCreate: "", CreatedLog: {} };

    if (inDataPK > 0) {
        let LocalReturnData;
        let LocalOriginalData;
        let LocalFolderName = inJsonConfig.inFolderName;
        let LocalFileNameWithExtension = inJsonConfig.inJsonFileName;
        let LocalItemName = inItemConfig.inItemName;
        let LocalScreenName = inItemConfig.inScreenName;

        let LocalFromPullData = CommonPullData.StartFunc({
            inFolderName: LocalFolderName,
            inFileNameWithExtension: LocalFileNameWithExtension,
            inDataPK
        });

        LocalReturnObject = { ...LocalFromPullData };
        LocalReturnObject.KTF = false;

        if (LocalFromPullData.KTF === false) {
            return LocalReturnObject;
        };

        //   console.log("LocalOriginalData : ", LocalOriginalData);
        if (LocalItemName in LocalReturnObject.JsonData === false) {
            LocalReturnObject.KReason = "ItemName not found...";
            return LocalReturnObject;
        };

        if (LocalScreenName in LocalReturnObject.JsonData[LocalItemName]) {
            LocalReturnObject.KTF = true;
            LocalReturnObject.DataFromServer = LocalReturnObject.JsonData[LocalItemName][LocalScreenName];

            delete LocalReturnObject.JsonData;
        };

    };

    return LocalReturnObject;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K11') {
        let LocalMockData = require('./NoSync.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = {
    StartFunc
};