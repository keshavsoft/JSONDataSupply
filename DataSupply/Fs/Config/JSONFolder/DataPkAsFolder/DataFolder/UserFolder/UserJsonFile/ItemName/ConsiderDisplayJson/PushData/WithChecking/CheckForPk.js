let CommonFromPullDataFromFile = require("../../../../PullDataFromFile/FromFolderAndFile");
let CommonFromConfigFolder = require("../../../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/PullData/NoSync");
let CommonFromPushDataToFile = require("../../../../PushDataToFile/FolderAndFile");
let CommonMock = require("../../../../../../../../../../../MockAllow.json");


let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inScreenname, inDataPK, inDataToInsert }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;
    let LocalinScreenname = inScreenname;
    let LocalNewPK;
    const LocalDataObject = (({ pk }) => ({ pk }))(inDataToInsert)
    let localpk = LocalDataObject.pk



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

    if ((LocalinItemName in LocalFromCommonFromCheck.JsonData) === false) {
        LocalReturnData.KReason = `Item Name : ${LocalinItemName} not found!`;
        return LocalReturnData;
    };

    let LocalNewObject = LocalFuncPrepareObject({
        inFolderName: LocalinFolderName,
        inFileNameWithExtension: `${LocalinFileNameOnly}.json`,
        inItemName: LocalinItemName,
        inScreenName: LocalinScreenname,
        inDataPK: LocalinDataPK
    });

    LocalNewObject = {
        ...LocalNewObject,
        ...inDataToInsert
    };

    if (localpk in LocalFromCommonFromCheck.JsonData[LocalinItemName]) {
        LocalReturnData.KReason = `${localpk} Already Found !`;
        delete LocalReturnData.JsonData;
        
        return LocalReturnData;
    };

    LocalFromCommonFromCheck.JsonData[LocalinItemName][localpk] = LocalNewObject;

    let LocalFromPush = CommonFromPushDataToFile.InsertToJsonNoAsync({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK,
        inDataToUpdate: LocalFromCommonFromCheck.JsonData,
        inOriginalData: ""
    });

    console.log("LocalFromPush : ", LocalFromPush);
    LocalReturnData.KTF = true;
    LocalReturnData.NewPk = localpk;
    LocalReturnData.NewPkJsonData = LocalFromCommonFromCheck.JsonData[LocalinItemName][localpk];

    return LocalReturnData;
};

let LocalFuncPrepareObject = ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK }) => {
    let LocalinFolderName = inFolderName;
    let LocalinItemName = inItemName;
    let LocalinScreenname = inScreenName;
    let LocalinDataPK = inDataPK;
    let LocalReturnObject = {};

    let LocalFromCommonFromConfigFolder = CommonFromConfigFolder.StartFunc({
        inFolderName: LocalinFolderName,
        inFileNameWithExtension,
        inItemName: LocalinItemName,
        inScreenName: LocalinScreenname,
        inDataPK: LocalinDataPK
    });

    if (LocalFromCommonFromConfigFolder.KTF === false) {
        return LocalReturnData;
    };

    let LocalTableColumns = LocalFromCommonFromConfigFolder.JsonData.TableColumns;
    let LocalInsertFilter = LocalTableColumns.filter(element => element.Insert);

    LocalInsertFilter.forEach(element => {
        LocalReturnObject[element.DataAttribute] = element.DefaultValue;
    });

    return LocalReturnObject;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'SSC') {
        let LocalMockData = require('./CheckForPk.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };
