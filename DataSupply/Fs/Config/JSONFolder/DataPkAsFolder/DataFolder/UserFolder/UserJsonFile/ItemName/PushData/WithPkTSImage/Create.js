let CommonFromPushData = require("../ToPk/EntryFile");
let CommonFromPullData = require("../../PullData/FromFolderFileItemName");
let CommonMock = require("../../../../../../../../../../MockAllow.json");
let ComonTimestamp = require("./TimeStamp");

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inDataToInsert, inDataPK }) => {

    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;
    let LocalinDataPK = inDataPK;
    let LocalinDataToInsert = inDataToInsert;

    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromPullData = CommonFromPullData.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalinItemName,
        inDataPK: LocalinDataPK
    });

    LocalReturnData = { ...LocalFromCommonFromPullData };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromPullData.KTF === false) {
        delete LocalReturnData.JsonData;
        return LocalReturnData;
    };

    let LocalNewData = JSON.parse(JSON.stringify(LocalFromCommonFromPullData.JsonData));

    let LocalArray = Object.keys(LocalNewData);
    let numberArray = LocalArray.map(Number);
    let LocalMax = Math.max(...numberArray, 0) + 1;

    if (LocalMax in LocalNewData) {
        LocalReturnData.KReason = `${LocalMax} Already Found !`;
        delete LocalReturnData.JsonData;

        return LocalReturnData;
    };
    let localDataInsert = ComonTimestamp.StartFunc({ inDataToInsert: LocalinDataToInsert });
    localDataInsert.UserPK = inDataPK;
    localDataInsert.pk = LocalMax;

    if ((LocalMax in LocalNewData) === false) {
        let LocalFromCommonFromPushDataToFile = CommonFromPushData.StartFunc({
            inFolderName: LocalinFolderName,
            inFileNameOnly: LocalinFileNameOnly,
            inItemName: LocalinItemName,
            inpk: LocalMax,
            inDataToInsert: localDataInsert,
            inDataPK: LocalinDataPK
        });

        if (LocalFromCommonFromPushDataToFile.KTF === false) {
            LocalReturnData.KReason = LocalFromCommonFromPushDataToFile.KReason;
            return LocalReturnData;
        };

        LocalReturnData.KTF = true;
        LocalReturnData.NewRowPK = LocalMax;
        delete LocalReturnData.JsonData;
    };

    return LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K125') {
        let LocalMockData = require('./Create.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };
