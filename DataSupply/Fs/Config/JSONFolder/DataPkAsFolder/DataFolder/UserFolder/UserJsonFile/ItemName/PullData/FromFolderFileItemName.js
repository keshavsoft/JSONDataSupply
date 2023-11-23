let CommonFromCheck = require("../Check");
let _ = require("lodash");
let CommonMock = require("../../../../../../../../../MockAllow.json");

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inDataPK }) => {
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
    LocalReturnData = { ...LocalFromCommonFromCheck };
    LocalReturnData.KTF = false;

    if (LocalFromCommonFromCheck.KTF === false) {
        LocalReturnData.KReason = LocalFromCommonFromCheck.KReason;
        return LocalReturnData;
    };

    LocalReturnData.JsonData = LocalFromCommonFromCheck.JsonData[LocalinItemName];
    LocalReturnData.KTF = true;

    return LocalReturnData;
};

let ReturnAsArrayWithPK = ({ inFolderName, inFileNameOnly, inItemName, inDataPK }) => {
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

    LocalReturnData.JsonData = Object.keys(LocalFromCommonFromCheck.JsonData[LocalinItemName]).map(element => {
        return {
            ...LocalFromCommonFromCheck.JsonData[LocalinItemName][element],
            pk: element
        };
    });
    //console.log("LocalReturnData : ", LocalReturnData);

    LocalReturnData.KTF = true;

    return LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'KKS') {
        let LocalMockData = require('./FromFolderFileItemName.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log("LocalData:",LocalData);
    };
};

module.exports = { StartFunc, ReturnAsArrayWithPK };