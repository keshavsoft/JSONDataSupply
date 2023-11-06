let CommonFromPullDataFromFile = require("../../../../PullDataFromFile/FromFolderAndFile");
let CommonFromConfigFolder = require("../../../../../../../ConfigFolder/UserFolder/UserFileAsFolder/DisplayJsonFile/ItemName/ScreenName/PullData/NoSync");
let CommonFromPushDataToFile = require("../../../../PushDataToFile/FolderAndFile");
let ComonTimestamp = require("./TimeStamp");
let CommonMock = require("../../../../../../../../../../../MockAllow.json");
let CommongetDirectoriesWithDataAsTree = require("../../../../../../getDirectoriesWithDataAsTree");


let StartFunc = ({ inFolderName, inFileNameOnly, inItemName, inScreenName, inDataPK, inDataToInsert }) => {
    let LocalinFolderName = inFolderName;
    let LocalinFileNameOnly = inFileNameOnly;
    let LocalinItemName = inItemName;
    let LocalinScreenname = inScreenName;
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

    let LocalFromServerSide = LocalFuncConfigColumns({
        inFolderName: LocalinFolderName,
        inFileNameWithExtension: `${LocalinFileNameOnly}.json`,
        inItemName: LocalinItemName,
        inScreenName: LocalinScreenname,
        inDataPK: LocalinDataPK,
        InDataToInsert: LocalNewObject
    });

    let LocalLocalFromServerSideFilter = LocalFromServerSide.filter(element => element.ServerSideCheck === false);

    if (LocalLocalFromServerSideFilter.length>0) {
        LocalReturnData.KReason = "FromServerSide"
        LocalReturnData.ServerSideCheck = LocalLocalFromServerSideFilter
        return LocalReturnData;
    };

    let localDataInsert = ComonTimestamp.StartFunc({ inDataToInsert: LocalNewObject });

    LocalFromCommonFromCheck.JsonData[LocalinItemName][localpk] = localDataInsert;

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

let LocalFuncConfigColumns = ({ inFolderName, inFileNameWithExtension, inItemName, inScreenName, inDataPK, InDataToInsert }) => {
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

    let LocalFromCommongetDirectoriesWithDataAsTree = CommongetDirectoriesWithDataAsTree.StartFunc({ inDataPK });

    let LocalTableColumns = LocalFromCommonFromConfigFolder.JsonData.TableColumns;
    let LocalInsertFilter = LocalTableColumns.filter(element => element.ServerSide.SaveCheck.Validate);

    let LocalReturnArray = LocalInsertFilter.map(element => {
        let LoopFolderName = element.ServerSide.DefaultShowData.FolderName;
        let LoopFileName = element.ServerSide.DefaultShowData.FileName;
        let LoopItemName = element.ServerSide.DefaultShowData.ItemName;
        let LoopInsideValueTocheck = InDataToInsert[element.DataAttribute];
        let LoopFilterString = element.ServerSide.DefaultShowData.FilterString;
        let LoopInsideDataNeeded =  LocalFromCommongetDirectoriesWithDataAsTree[LoopFolderName][LoopFileName][LoopItemName];
        let LoopInsideFilter = Object.entries(LoopInsideDataNeeded).find(element => eval(LoopFilterString));
        
        // let LoopInsideFilter = LocalFromCommongetDirectoriesWithDataAsTree[LoopFolderName][LoopFileName][LoopItemName][LoopInsideValueTocheck];
        if (typeof LoopInsideFilter === "undefined") {
            return {
                DisplayName: element.DisplayName,
                DataAttribute: element.DataAttribute,
                ServerSideCheck: false
            };
        };
        return {
            DisplayName: element.DisplayName,
            DataAttribute: element.DataAttribute,
            ServerSideCheck: true
        };
    });

    return LocalReturnArray;
};

if (CommonMock.AllowMock) {
    if (CommonMock.MockKey === 'K15') {
        let LocalMockData = require('./CheckForPk.json');

        let LocalData = StartFunc({
            inDataPK: CommonMock.DataPK,
            ...LocalMockData
        });
        console.log('LocalData : ', LocalData);

    };
};

module.exports = { StartFunc };
