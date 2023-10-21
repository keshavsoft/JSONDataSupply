let CommonFromFolderFileItemName = require("../../../FromFolderFileItemName");
let CommonMock = require("../../../../../../../../../../../../MockAllow.json");

let StartFunc = ({ FolderName, FileNameOnly, ItemName, FilterString, inDataPK }) => {
    let LocalinFolderName = FolderName;
    let LocalinFileNameOnly = FileNameOnly;
    let LocalinItemName = ItemName;
    let LocalFilterString = FilterString;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromFolderFileItemName.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalinItemName,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromCheck.KTF === false) {
        return LocalReturnData;
    };

    let LocalFilteredData = Object.entries(LocalFromCommonFromCheck.JsonData).filter(([key, value]) => eval(LocalFilterString));

    LocalReturnData.JsonData = LocalFilteredData.length;
    LocalReturnData.KTF = true;

    return LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K12') {
        let LocalMockData = require('./TotalCount.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log("LocalData:", LocalData);
    };
};

module.exports = { StartFunc };