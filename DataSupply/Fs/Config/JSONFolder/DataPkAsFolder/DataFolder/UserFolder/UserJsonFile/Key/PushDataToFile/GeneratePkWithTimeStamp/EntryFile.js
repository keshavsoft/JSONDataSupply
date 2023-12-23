let CommonFromPullDataFromFile = require("../../../PullDataFromFile/FromFolderAndFile");
let CommonFromPushDataToFile = require("../../../PushDataToFile/FolderAndFile");
let ComonTimestamp = require("./TimeStamp");
let CommonMock = require("../../../../../../../../../../MockAllow.json");

const toNumbers = arr => arr.map(Number);

let GeneratePk = ({ inDataWithKey }) => {
    let LocalNewPk = 16;
    let LocalPkArray = toNumbers(Object.keys(inDataWithKey));

    if (LocalPkArray.length > 0) {
        LocalNewPk = Math.max(...LocalPkArray) + 1;
    };

    return LocalNewPk;
};

let StartFunc = ({ inFolderName, inFileNameOnly, inDataPK, inDataToInsert }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalNewPK;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromPullDataFromFile.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    LocalNewPK = GeneratePk({ inDataWithKey: LocalFromCommonFromCheck.JsonData });

    let localDataInsert = ComonTimestamp.StartFunc({ inDataToInsert });
    localDataInsert.UserPK = LocalinDataPK;
    localDataInsert.pk = LocalNewPK;

    LocalFromCommonFromCheck.JsonData[LocalNewPK] = localDataInsert;

    let LocalFromPush = CommonFromPushDataToFile.InsertToJsonNoAsync({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK,
        inDataToUpdate: LocalFromCommonFromCheck.JsonData,
        inOriginalData: ""
    });

    if (LocalFromPush.KTF === false) {
        return LocalReturnData;
    };
    
    LocalReturnData.KTF = true;
    LocalReturnData.NewPk = LocalNewPK;
    LocalReturnData.NewPkJsonData = LocalFromCommonFromCheck.JsonData[LocalNewPK];

    return LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'Kvm') {
        let LocalMockData = require('./EntryFile.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };
