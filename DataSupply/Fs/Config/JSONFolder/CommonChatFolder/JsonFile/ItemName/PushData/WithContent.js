let CommonCheck = require("../Check");
let CommonPushDataToFile = require("../../PushDataToFile/EntryFile");
let CommonMock = require("../../../../../../../MockAllow.json");

let StartFunc = ({ inFileNameOnly, inItemName, inItemNameContent }) => {
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;

    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonCheck.StartFunc({
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalinItemName
    });

    LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF) {
        return LocalReturnData;
    };

    LocalFromCommonFromCheck.JsonData[LocalinItemName] = inItemNameContent;

    let LocalFromPush = CommonPushDataToFile.StartFunc({
        inFileNameOnly: LocalinFileNameOnly,
        inDataToUpdate: LocalFromCommonFromCheck.JsonData
    });

    if (LocalFromPush.KTF === false) {
        LocalReturnData.KReason = LocalFromPush.KReason;
        return LocalReturnData;
    };

    LocalReturnData.KTF = true;

    return LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K16') {
        let LocalMockData = require('./WithContent.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };
