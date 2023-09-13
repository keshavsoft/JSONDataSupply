let CommonFromFolderAndFile = require("../../../PullDataFromFile/FromFolderAndFile");
let CommonMock = require("../../../../../../../../../../MockAllow.json");

let StartFunc = ({ inFolderName, inFileNameOnly, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;

    let LocalinDataPK = inDataPK;
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonFromCheck = CommonFromFolderAndFile.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK
    });

    LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KTFFromRoot = false;

        return LocalReturnData;
    };
    let obj = Object.keys(LocalReturnData.JsonData).map(Number);
    const isNumber = obj.filter(n => !isNaN(n));
    let localMaxNumber = Math.max(...isNumber, 0)
    LocalReturnData.Max = localMaxNumber + 1;
    LocalReturnData.KTF = true;


    return LocalReturnData;
};
if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === '') {
        let LocalMockData = require('./MaxItem.json');

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
