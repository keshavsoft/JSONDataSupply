let CommonFromPushData = require("../ToPk/EntryFile");
let CommonFromPullData = require("../../PullData/FromFolderFileItemName");
let CommonTimeStamp = require("./TimeStamp");

let CommonMock = require("../../../../../../../../../../MockAllow.json");

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inDataToInsert, inDataPK }) => {

    const LocalDataObject = (({ pk }) => ({ pk }))(inDataToInsert)

    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;

    let localpk = LocalDataObject.pk

    let LocalinDataPK = inDataPK;
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

    if (localpk in LocalNewData) {
        LocalReturnData.KReason = `${localpk} Already Found !`;
        delete LocalReturnData.JsonData;

        return LocalReturnData;
    };
    let localinDataToInsert = CommonTimeStamp.StartFunc({inDataToInsert});

    if ((localpk in LocalNewData) === false) {
        let LocalFromCommonFromPushDataToFile = CommonFromPushData.StartFunc({
            inFolderName: LocalinFolderName,
            inFileNameOnly: LocalinFileNameOnly,
            inItemName: LocalinItemName,
            inpk: localpk,
            inDataToInsert: localinDataToInsert,
            inDataPK: LocalinDataPK
        });

        if (LocalFromCommonFromPushDataToFile.KTF === false) {
            LocalReturnData.KReason = LocalFromCommonFromPushDataToFile.KReason;
            return LocalReturnData;
        };

        LocalReturnData.KTF = true;
        LocalReturnData.NewRowPK = localpk;
        delete LocalReturnData.JsonData;
    };

    return LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'KKSSs') {
        let LocalMockData = require('./CheckForPk.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };
