let CommonFromPullDataFromFile = require("../../../../PullDataFromFile/FromFolderAndFile");
let CommonFromConfigFolder = require("../../../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/PullData/NoSync");
let CommonFromPushDataToFile = require("../../../../PushDataToFile/FolderAndFile");
let CommonTimeStamp = require("./TimeStamp");
let CommonMock = require("../../../../../../../../../../../MockAllow.json");

const toNumbers = arr => arr.map(Number);

let GeneratePk = ({ inDataWithKey }) => {
    let LocalNewPk = 16;
    let LocalPkArray = toNumbers(Object.keys(inDataWithKey));

    if (LocalPkArray.length > 0) {
        LocalNewPk = Math.max(...LocalPkArray) + 1;
    };

    return LocalNewPk;
};

let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inScreenname, inDataPK, inDataToInsert }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;
    let LocalinScreenname = inScreenname;
    let LocalNewPK;

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


    LocalNewPK = GeneratePk({ inDataWithKey: LocalFromCommonFromCheck.JsonData[LocalinItemName] });
    LocalNewObject.pk = LocalNewPK;

    let localInsertData = CommonTimeStamp.StartFunc({ inDataToInsert: LocalNewObject });

    LocalFromCommonFromCheck.JsonData[LocalinItemName][LocalNewPK] = localInsertData;

    let LocalFromPush = CommonFromPushDataToFile.InsertToJsonNoAsync({
        inFolderName: LocalinFolderName,
        inFileNameOnly: LocalinFileNameOnly,
        inDataPK: LocalinDataPK,
        inDataToUpdate: LocalFromCommonFromCheck.JsonData,
        inOriginalData: ""
    });

    console.log("LocalFromPush : ", LocalFromPush);
    LocalReturnData.KTF = true;
    LocalReturnData.NewPk = LocalNewPK;
    LocalReturnData.NewPkJsonData = LocalFromCommonFromCheck.JsonData[LocalinItemName][LocalNewPK];

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
    if (CommonMock.MockKey === 'KCqC') {
        let LocalMockData = require('./EntryFile.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };
