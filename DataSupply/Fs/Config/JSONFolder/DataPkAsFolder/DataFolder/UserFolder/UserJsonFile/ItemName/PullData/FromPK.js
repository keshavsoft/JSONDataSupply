let CommonFromCheck = require("./FromFolderFileItemName");
let CommonMock = require("../../../../../../../../../MockAllow.json");

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inDataPK, inJsonPk }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromCheck.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalinItemName,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    if ((inJsonPk in LocalFromCommonFromCheck.JsonDataFromItem) === false) {
        LocalReturnData.KReason = `RowPK : ${inJsonPk} is not found in data!`;
        return LocalReturnData;
    };

    LocalReturnData.JsonData = LocalFromCommonFromCheck.JsonDataFromItem[inJsonPk];
    LocalReturnData.JsonData.pk = inJsonPk;

    LocalReturnData.KTF = true;

    return LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K25') {
        let LocalMockData = require('./FromPK.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };
