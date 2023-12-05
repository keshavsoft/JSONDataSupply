let CommonCreate = require("./CreateImagePath");
let CommonMock = require("../../../../../../../../../../MockAllow.json");
let fs = require("fs");

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inDataToInsert, inDataPK }) => {

    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;
    let localinDataToInsert = inDataToInsert;
    let LocalinDataPK = inDataPK;

    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {} };

    let LocalFromCommonCommonCreate = CommonCreate.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inItemName: LocalinItemName,
        inDataToInsert: localinDataToInsert,
        inDataPK: LocalinDataPK
    });

    LocalReturnData = { ...LocalFromCommonCommonCreate };
    LocalReturnData.KTF = false;

    if (LocalFromCommonCommonCreate.KTF === false) {
        return LocalReturnData;
    };

    // LocalReturnData.RowPkAsFolderPath = LocalFromCommonCommonCreate.RowPkAsFolderPath;

    try {
        if (fs.statSync(LocalReturnData.RowPkAsFolderPath).isDirectory()) {
            LocalReturnData.KTF = true;
        } else {
            LocalReturnData.KReason = "Images Folder not found!";
        }
    } catch (error) {
        LocalReturnData.KReason = "Images Folder not found!!";
    };

    LocalReturnData.KTF = true;


    return LocalReturnData;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K1333') {
        let LocalMockData = require('./Create.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };
