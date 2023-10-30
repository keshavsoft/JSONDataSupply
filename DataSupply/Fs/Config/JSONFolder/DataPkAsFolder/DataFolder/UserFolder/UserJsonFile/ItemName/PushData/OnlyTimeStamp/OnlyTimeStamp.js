let CommonFromPushData = require("../ToPk/EntryFile");
let CommonFromPullData = require("../../PullData/FromFolderFileItemName");
let CommonTimeStamp = require("./TimeStamp");

let CommonMock = require("../../../../../../../../../../MockAllow.json");

let StartFunc = ({ inPurchasePK, inFileNameOnly, inDataPk }) => {
    let inDataPK = inDataPk;
    let LocalDataObject = inPurchasePK;

    let LocalinFolderName = "Transactions";
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = "Orders";

    let localpk = LocalDataObject

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

    let localinDataToInsert = CommonTimeStamp.StartFunc();

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
    if (CommonMock.MockKey === 'K12') {
        let LocalMockData = require('./OnlyTimeStamp.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };
