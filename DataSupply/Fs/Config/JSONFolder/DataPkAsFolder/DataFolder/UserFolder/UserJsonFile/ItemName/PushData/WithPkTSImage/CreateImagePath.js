let CommonCreate = require("./Create");
let CommonMock = require("../../../../../../../../../../MockAllow.json");
let fs = require("fs");

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inDataToInsert, inDataPK }) => {

    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;
    let localinDataToInsert = inDataToInsert;
    let LocalinDataPK = inDataPK;
    let LocalImagesPath = "Images";

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

    let LocalRowPk = LocalFromCommonCommonCreate.NewRowPK;

    LocalReturnData.FolderPath = LocalFromCommonCommonCreate.FolderPath;
    LocalReturnData.UserJsonFileAsFolderPath = `${LocalReturnData.FolderPath}/${LocalinFileNameOnly}`;
    LocalReturnData.ItemNameAsFolderPath = `${LocalReturnData.UserJsonFileAsFolderPath}/${LocalinItemName}`;
    LocalReturnData.ImagesFolderPath = `${LocalReturnData.ItemNameAsFolderPath}/${LocalImagesPath}`;
    LocalReturnData.RowPkAsFolderPath = `${LocalReturnData.ImagesFolderPath}/${LocalRowPk}`

    try {
        fs.mkdirSync(LocalReturnData.RowPkAsFolderPath, {
            recursive: true
        });

        delete LocalReturnData.JsonDataFromItem;
        LocalReturnData.KTF = true;
    } catch (error) {
        LocalReturnData.KReason = "Images Folder not found!";
    };

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
